import { BadRequestException, Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectInputDto } from '@the-secret-store/api-interfaces/dtos/project';
import { isMongoId } from 'class-validator';
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

  @Patch(':projectId')
  async updateSecrets(
    @CurrentUser() user: AuthPayload,
    @Param('projectId') projectId: ObjectIdType,
    @Body('secrets') secrets: Record<string, string>
  ) {
    if (!isMongoId(projectId)) throw new BadRequestException({ message: 'Not a valid project id' });
    const result = await this.projectService.updateSecrets({ userId: user.id, projectId, secrets });
    return { message: 'Secrets updated successfully', result };
  }
}
