import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectInputDto } from '@the-secret-store/api-interfaces/dtos/project';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { EncryptionService } from '../../utils/EncryptionService';
import { UserService } from '../user/user.service';
import { AccessLevel } from './access-levels.enum';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  private readonly encryptionEngine: EncryptionService;
  constructor(
    @InjectRepository(Project) private readonly repo: Repository<Project>,
    private readonly userService: UserService,
    private readonly logger: Logger,
    private readonly configService: ConfigService
  ) {
    const encryptionKey = this.configService.get('SECRETS_ENCRYPTION_KEY');
    this.encryptionEngine = new EncryptionService(encryptionKey, 'aes-256-gcm');
  }

  async create(userId: ObjectIdType, createProjectDto: CreateProjectInputDto) {
    const project = this.repo.create({ ...createProjectDto, createdBy: userId });

    await this.repo.save(project);
    await this.userService.addProject(userId, project.id);

    this.logger.verbose(project, ProjectService.name);

    return project;
  }

  async findById(id: ObjectIdType) {
    const [project] = await this.repo.findByIds([id]);
    if (!project)
      throw new NotFoundException({
        message: 'The given project id is either invalid or the project no longer exist',
      });
    this.logger.debug(project, ProjectService.name);
    return project;
  }

  async updateSecrets(
    userId: ObjectIdType,
    projectId: ObjectIdType,
    secrets: Record<string, string>
  ) {
    const project = await this.checkAccessAndFindProject(
      userId,
      projectId,
      AccessLevel.COLLABORATOR
    );

    project.backup = project.secrets || {};
    project.secrets = this.encryptionEngine.encryptValues(secrets);
    project.lastUpdatedBy = userId;

    await this.repo.save(project);

    return project;
  }

  async getSecrets(userId: ObjectIdType, projectId: ObjectIdType) {
    const project = await this.checkAccessAndFindProject(userId, projectId, AccessLevel.MEMBER);

    return this.encryptionEngine.decryptValues(project.secrets);
  }

  /**
   * Checks if the user has access to the project,
   * if not, throws an exception and terminates the request
   */
  private async checkAccessAndFindProject(
    userId: ObjectIdType,
    projectId: ObjectIdType,
    accessLevel: AccessLevel
  ) {
    const project = await this.findById(projectId);

    const throwError = () => {
      throw new ForbiddenException({
        message: `The user is not a ${accessLevel} of the project`,
      });
    };

    switch (accessLevel) {
      case AccessLevel.OWNER:
        if (project.owner !== userId) throwError();
        break;

      case AccessLevel.COLLABORATOR:
        if (!(project.collaborators.includes(userId) || project.owner === userId)) throwError();
        break;

      case AccessLevel.MEMBER:
        if (
          !(
            project.members.includes(userId) ||
            project.collaborators.includes(userId) ||
            project.owner === userId
          )
        )
          throwError();
        break;
    }

    return project;
  }
}
