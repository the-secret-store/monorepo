import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '../project/project.module';
import { TeamModule } from '../team/team.module';
import { TeamService } from '../team/team.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { InvitationController } from './invitation.controller';
import { Invitation } from './invitation.entity';
import { InvitationService } from './invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), ProjectModule, TeamModule, UserModule],
  controllers: [InvitationController],
  providers: [Logger, InvitationService, TeamService, UserService],
})
export class InvitationModule {}
