import { BadRequestException, Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import {
  CreateProjectInviteInputDto,
  CreateTeamInviteInputDto,
} from '@the-secret-store/api-interfaces/dtos/invitation';
import { docTags } from '../../constants/api-tags';
import { CurrentUser, Protect } from '../auth/decorators';
import { AuthPayload } from '../auth/token/token.strategy';
import { InvitationService } from './invitation.service';
import { isMongoId } from 'class-validator';

@Controller('invitation')
@Protect()
@ApiTags(docTags.invitation.name)
@ApiBearerAuth()
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post('invite-to-team')
  async inviteToTeam(
    @CurrentUser() inviter: AuthPayload,
    @Body() createInviteDetails: CreateTeamInviteInputDto
  ) {
    const invitation = await this.invitationService.inviteToTeam(inviter.id, createInviteDetails);
    return { message: 'Invitation created successfully', result: invitation };
  }

  @Post('invite-to-project')
  async inviteToProject(
    @CurrentUser() inviter: AuthPayload,
    @Body() createInviteDetails: CreateProjectInviteInputDto
  ) {
    const invitation = await this.invitationService.inviteToProject(
      ObjectId(inviter.id),
      createInviteDetails
    );
    return { message: 'Invitation created successfully', result: invitation };
  }

  @Patch(':invitationId/accept')
  async acceptInvitation(
    @CurrentUser() user: AuthPayload,
    @Param('invitationId') invitationId: string
  ) {
    if (!isMongoId(invitationId)) {
      throw new BadRequestException({ message: 'Invalid invitation id' });
    }
    const invitation = await this.invitationService.acceptInvitation(
      user.email,
      ObjectId(user.id),
      ObjectId(invitationId)
    );
    return { message: 'Invitation accepted successfully', result: invitation };
  }
}
