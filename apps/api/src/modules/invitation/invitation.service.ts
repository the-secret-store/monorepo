import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectInviteInputDto,
  CreateTeamInviteInputDto,
} from '@the-secret-store/api-interfaces/dtos/invitation';
import { Privilege, ProjectAccessLevel } from '@the-secret-store/api-interfaces/enums';
import { Email } from '@the-secret-store/api-interfaces/types';
import { ObjectId } from 'mongodb';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { Invitation } from './invitation.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation) private readonly repo: Repository<Invitation>,
    private readonly logger: Logger,
    private readonly projectService: ProjectService,
    private readonly teamService: TeamService,
    private readonly userService: UserService
  ) {}

  async inviteToTeam(
    inviterId: ObjectIdType,
    { email, teamId, privilege }: CreateTeamInviteInputDto
  ) {
    const team = await this.teamService.findById(ObjectId(teamId));

    if (!team.admins.includes(inviterId)) {
      throw new ForbiddenException({ message: 'Only admins can invite users to a team' });
    }

    const invitation = this.repo.create({
      from: inviterId,
      to: 'team',
      recipient: email,
      teamOrProjectId: teamId,
      privilege,
    });

    await this.repo.save(invitation);

    // todo: add a mailer service
    this.logger.debug(`Invitation id: ${invitation.id}`, InvitationService.name);

    return invitation;
  }

  async inviteToProject(
    inviterId: ObjectIdType,
    { email, projectId, accessLevel }: CreateProjectInviteInputDto
  ) {
    await this.projectService.checkAccessAndFindProject(
      inviterId,
      ObjectId(projectId),
      ProjectAccessLevel.OWNER
    );

    const invitation = this.repo.create({
      from: inviterId,
      to: 'project',
      recipient: email,
      teamOrProjectId: ObjectId(projectId),
      accessLevel: accessLevel || ProjectAccessLevel.MEMBER,
    });

    await this.repo.save(invitation);

    // todo: add a mailer service
    this.logger.debug(`Invitation id: ${invitation.id}`, InvitationService.name);

    return invitation;
  }

  private async addUserToTeam(userId: ObjectIdType, teamId: ObjectIdType, privilege: Privilege) {
    const team = await this.teamService.findById(teamId);
    if (!team) {
      throw new BadRequestException({ message: "The team you're invited to no longer exists" });
    }

    const user = await this.userService.findById(userId);

    await this.userService.addTeam(user, teamId);
    await this.teamService.addUser(team, user.id, privilege);
  }

  async acceptInvitation(userEmail: Email, userId: ObjectIdType, invitationId: ObjectIdType) {
    const invitation = await this.repo.findOne(invitationId);

    if (invitation.recipient !== userEmail) {
      throw new ForbiddenException({ message: 'You are not the recipient of this invitation' });
    }

    switch (invitation.to) {
      case 'project':
        await this.projectService.addUserToProject(
          userId,
          invitation.teamOrProjectId,
          invitation.accessLevel
        );
        break;

      case 'team':
        await this.addUserToTeam(userId, invitation.teamOrProjectId, invitation.privilege);
        break;
    }
    invitation.status = 'accepted';
    await this.repo.save(invitation);

    // todo: send email

    return invitation;
  }
}
