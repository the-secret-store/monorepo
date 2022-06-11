import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectInputDto } from '@the-secret-store/api-interfaces/dtos/project';
import { isMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ObjectID as ObjectIdType } from 'typeorm';
import { docTags } from '../../constants/api-tags';
import { CurrentUser, Protect } from '../auth/decorators';
import { AuthPayload } from '../auth/token/token.strategy';
import { ProjectService } from './project.service';

@ApiTags(docTags.project.name)
@Protect()
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@CurrentUser() user: AuthPayload, @Body() createProjectDto: CreateProjectInputDto) {
    const project = await this.projectService.create(user.id, createProjectDto);
    return { message: 'Project created successfully', result: project };
  }

  @Get('/accessible')
  async accessibleProjects(@CurrentUser() user: AuthPayload) {
    const projects = await this.projectService.getAllAccessibleProjects(ObjectId(user.id));
    return { message: 'Accessible projects retrieved successfully', result: projects };
  }

  @Get('/:projectId/access')
  async getUsersWithAccess(@Param('projectId') projectId: ObjectIdType) {
    if (!isMongoId(projectId)) throw new BadRequestException('Invalid project id');
    const usersWithAccess = await this.projectService.getAllUsersWithAccess(ObjectId(projectId));
    return { message: 'Users with access retrieved successfully', result: usersWithAccess };
  }

  @Patch('/:projectId/remove-access')
  async removeAccess(
    @CurrentUser() currentUser: AuthPayload,
    @Body('userId') userId: string,
    @Param('projectId') projectId: string
  ) {
    if (!isMongoId(projectId)) throw new BadRequestException({ message: 'Not a valid project id' });
    const result = await this.projectService.removeAccess(
      ObjectId(currentUser.id),
      ObjectId(projectId),
      ObjectId(userId)
    );
    return { message: 'Access removed successfully', result };
  }

  @Get('/:projectId')
  async projectInformation(
    @CurrentUser() user: AuthPayload,
    @Param('projectId') projectId: ObjectIdType
  ) {
    if (!isMongoId(projectId)) throw new BadRequestException({ message: 'Not a valid project id' });
    const result = await this.projectService.getProjectDetails(
      ObjectId(user.id),
      ObjectId(projectId)
    );

    return { message: 'Project information retrieved successfully', result };
  }

  @Get('/secrets/:projectId')
  async getSecrets(@CurrentUser() user: AuthPayload, @Param('projectId') projectId: ObjectIdType) {
    if (!isMongoId(projectId)) throw new BadRequestException({ message: 'Invalid project id' });
    const secrets = await this.projectService.getSecrets(ObjectId(user.id), ObjectId(projectId));
    return { message: 'Project secrets retrieved successfully', result: secrets };
  }

  @Patch('/secrets/:projectId')
  async updateSecrets(
    @CurrentUser() user: AuthPayload,
    @Param('projectId') projectId: ObjectIdType,
    @Body() secrets: Record<string, string>
  ) {
    if (!isMongoId(projectId)) throw new BadRequestException({ message: 'Not a valid project id' });
    const result = await this.projectService.updateSecrets(
      ObjectId(user.id),
      ObjectId(projectId),
      secrets
    );
    return { message: 'Secrets updated successfully', result };
  }
}
