import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectInputDto,
  UpdateSecretsInputDto,
} from '@the-secret-store/api-interfaces/dtos/project';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { MiscConfig } from '../../config';
import { EncryptionService } from '../../utils/EncryptionService';
import { UserService } from '../user/user.service';
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
    const { encryptionKey } = this.configService.get<MiscConfig>('misc');
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
    return this.repo.findOne(id);
  }

  async updateSecrets({ userId, projectId, secrets }: UpdateSecretsInputDto) {
    this.checkAccess(userId, projectId);
    const project = await this.findById(projectId);

    if (!project)
      throw new NotFoundException({
        message: 'The given project id is either invalid or the project no longer exist',
      });

    project.backup = project.secrets;
    project.secrets = this.encryptionEngine.encryptValues(secrets);
    project.lastUpdatedBy = userId;

    await this.repo.save(project);

    return project;
  }

  async getSecrets(userId: ObjectIdType, projectId: ObjectIdType) {
    this.checkAccess(userId, projectId);
    const project = await this.findById(projectId);

    return this.encryptionEngine.decryptValues(project.secrets);
  }

  /**
   * Checks if the user has access to the project,
   * if not, throws an exception and terminates the request
   */
  private async checkAccess(userId: ObjectIdType, projectId: ObjectIdType) {
    const user = await this.userService.findById(userId);

    if (!user.projects.some(p => p === projectId)) {
      throw new ForbiddenException({ message: "You don't have access to this project" });
    }
  }
}
