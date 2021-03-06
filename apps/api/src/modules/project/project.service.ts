import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { CreateProjectInputDto } from '@the-secret-store/api-interfaces/dtos/project';
import { ProjectAccessLevel } from '@the-secret-store/api-interfaces/enums';
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

  async getProjectDetails(userId: ObjectIdType, projectId: ObjectIdType) {
    const project = await this.checkAccessAndFindProject(
      userId,
      projectId,
      ProjectAccessLevel.MEMBER
    );

    this.logger.debug(project, ProjectService.name);

    return {
      ...project,
      secrets: this.encryptionEngine.decryptValues(project.secrets),
    };
  }

  async updateSecrets(
    userId: ObjectIdType,
    projectId: ObjectIdType,
    secrets: Record<string, string>
  ) {
    const project = await this.checkAccessAndFindProject(
      userId,
      projectId,
      ProjectAccessLevel.COLLABORATOR
    );

    this.logger.debug(secrets, ProjectService.name);

    project.backup = project.secrets || {};
    project.secrets = this.encryptionEngine.encryptValues(secrets);
    project.lastUpdatedBy = userId;

    await this.repo.save(project);

    return project;
  }

  async getSecrets(userId: ObjectIdType, projectId: ObjectIdType) {
    const project = await this.checkAccessAndFindProject(
      userId,
      projectId,
      ProjectAccessLevel.MEMBER
    );

    this.logger.debug(project, ProjectService.name);

    return {
      lastUpdatedBy: project.lastUpdatedBy,
      updatedAt: project.updatedAt,
      secrets: this.encryptionEngine.decryptValues(project.secrets),
    };
  }

  /**
   * Checks if the user has access to the project,
   * if not, throws an exception and terminates the request
   */
  async checkAccessAndFindProject(
    userId: ObjectIdType,
    projectId: ObjectIdType,
    accessLevel: ProjectAccessLevel
  ) {
    const project = await this.findById(projectId);

    if (!project)
      throw new NotFoundException({ message: 'The specified project could not be found' });

    const throwError = () => {
      throw new ForbiddenException({
        message: `The user is not a ${accessLevel} of the project`,
      });
    };

    switch (accessLevel) {
      case ProjectAccessLevel.OWNER:
        if (userId.equals(project.owner)) return project;
        break;

      case ProjectAccessLevel.COLLABORATOR:
        if (
          project.collaborators.some(collaborator => collaborator.equals(userId)) ||
          userId.equals(project.owner)
        )
          return project;
        break;

      case ProjectAccessLevel.MEMBER:
        if (
          project.collaborators.some(collaborator => collaborator.equals(userId)) ||
          project.members.some(member => member.equals(userId)) ||
          userId.equals(project.owner)
        )
          return project;
        break;
    }

    throwError();
  }

  async addUserToProject(
    userId: ObjectIdType,
    projectId: ObjectIdType,
    accessLevel: ProjectAccessLevel
  ) {
    const project = await this.findById(projectId);

    switch (accessLevel) {
      case ProjectAccessLevel.OWNER:
        project.owner = userId; // !NOT recommended
        break;

      case ProjectAccessLevel.COLLABORATOR:
        project.collaborators.push(userId);
        break;

      case ProjectAccessLevel.MEMBER:
        project.members.push(userId);
        break;
    }

    await this.repo.save(project);
  }

  async getAllAccessibleProjects(userId: ObjectIdType) {
    const projects = await this.repo.find();

    const accessibleProjects = projects.filter(
      project =>
        ObjectId(project.owner).equals(userId) ||
        project.collaborators.some(collaborator => collaborator.equals(userId)) ||
        project.members.some(member => member.equals(userId))
    );

    this.logger.debug(accessibleProjects);

    return accessibleProjects;
  }

  async getAllUsersWithAccess(projectId: ObjectIdType) {
    const project = await this.findById(projectId);
    const usersWithAccess = await Promise.all(
      project.collaborators.map(async collaborator => {
        const { avatarUrl, displayName } = await this.userService.findById(collaborator);
        return {
          id: collaborator,
          accessLevel: 'collaborator',
          name: displayName,
          avatar: avatarUrl,
        };
      })
    );

    return usersWithAccess.concat(
      await Promise.all(
        project.members.map(async member => {
          const { avatarUrl, displayName } = await this.userService.findById(member);
          return {
            id: member,
            accessLevel: 'member',
            name: displayName,
            avatar: avatarUrl,
          };
        })
      )
    );
  }

  async removeAccess(currentUser: ObjectIdType, projectId: ObjectIdType, userId: ObjectIdType) {
    const project = await this.checkAccessAndFindProject(
      currentUser,
      projectId,
      ProjectAccessLevel.OWNER
    );

    if (project.collaborators.some(collaborator => collaborator.equals(userId))) {
      project.collaborators = project.collaborators.filter(
        collaborator => !collaborator.equals(userId)
      );
    } else if (project.members.some(member => member.equals(userId))) {
      project.members = project.members.filter(member => !member.equals(userId));
    }

    await this.repo.save(project);
  }
}
