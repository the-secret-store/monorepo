import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTeamInputDto } from '@the-secret-store/api-interfaces/dtos/team';
import { docTags } from '../../constants/api-tags';
import { CurrentUser, Protect } from '../auth/decorators';
import { AuthPayload } from '../auth/token/token.strategy';
import { TeamService } from './team.service';

@Protect()
@ApiTags(docTags.team.name)
@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService, private readonly logger: Logger) {}

  @Post()
  async create(@CurrentUser() user: AuthPayload, @Body() createTeamDto: CreateTeamInputDto) {
    this.logger.verbose(user, 'TeamController');
    const team = await this.teamService.create(user.id, createTeamDto);
    return { message: 'Team created successfully', result: team };
  }
}
