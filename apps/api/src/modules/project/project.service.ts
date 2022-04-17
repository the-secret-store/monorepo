import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectInputDto,
  UpdateSecretsInputDto,
} from '@the-secret-store/api-interfaces/dtos/project';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly repo: Repository<Project>,
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}

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
    const project = await this.findById(projectId);

    if (!project)
      throw new NotFoundException({
        message: 'The given project id is either invalid or the project no longer exist',
      });

    const user = await this.userService.findById(userId);

    if (!user.projects.some(p => p === project.id)) {
      throw new ForbiddenException({ message: "You don't have access to this project" });
    }

    project.backup = project.secrets;
    project.secrets = secrets;
    project.lastUpdatedBy = user.id;

    await this.repo.save(project);

    return project;
  }
}
