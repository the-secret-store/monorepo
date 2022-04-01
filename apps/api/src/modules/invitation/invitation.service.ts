import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInviteInputDto } from '@the-secret-store/api-interfaces/dtos/invitation';
import { Privilege } from '@the-secret-store/api-interfaces/enums';
import { isMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { Invitation } from './invitation.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation) private readonly repo: Repository<Invitation>,
    private readonly teamService: TeamService,
    private readonly userService: UserService
  ) {}

  async invite(inviterId: ObjectIdType, { email, teamId, privilege }: CreateInviteInputDto) {
    const team = await this.teamService.findById(ObjectId(teamId));

    if (!team.admins.includes(inviterId)) {
      throw new ForbiddenException({ message: 'Only admins can invite users to a team' });
    }

    const invitation = this.repo.create({
      from: inviterId,
      to: email,
      team: teamId,
      privilege,
    });

    await this.repo.save(invitation);

    // todo: add a mailer service
    Logger.debug(`Invitation id: ${invitation.id}`, InvitationService.name);

    return invitation;
  }

  private async addUserToTeam(userEmail: string, teamId: ObjectIdType, privilege: Privilege) {
    const team = await this.teamService.findById(teamId);
    if (!team) {
      throw new BadRequestException({ message: "The team you're invited to no longer exists" });
    }

    const user = await this.userService.findByEmail(userEmail);

    await this.userService.addTeam(user, teamId);
    await this.teamService.addUser(team, user.id, privilege);
  }

  async acceptInvitation(userEmail: string, invitationId: string) {
    if (!isMongoId(invitationId)) {
      throw new BadRequestException({ message: 'Invalid invitation id' });
    }
    const invitation = await this.repo.findOne(invitationId);

    if (invitation.to !== userEmail) {
      throw new ForbiddenException({ message: 'You are not the recipient of this invitation' });
    }

    await this.addUserToTeam(invitation.to, invitation.team, invitation.privilege);
    invitation.status = 'accepted';
    await this.repo.save(invitation);

    // todo: send email

    return invitation;
  }
}
