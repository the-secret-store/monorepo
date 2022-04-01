import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamInputDto } from '@the-secret-store/api-interfaces/dtos/team';
import { Privilege } from '@the-secret-store/api-interfaces/enums';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team) private readonly repo: Repository<Team>) {}

  async create(userId: ObjectIdType, createTeamDto: CreateTeamInputDto) {
    const team = this.repo.create({ ...createTeamDto, createdBy: userId });
    await this.repo.save(team);
    return team;
  }

  async addUser(team: ObjectIdType | Team, userId: ObjectIdType, privilege: Privilege) {
    if (!(team instanceof Team)) team = await this.findById(team);

    switch (privilege) {
      case Privilege.admin:
        team.admins.push(userId);
        break;

      case Privilege.editor:
        team.editors.push(userId);
        break;

      case Privilege.viewer:
      default:
        team.viewers.push(userId);
    }

    return this.repo.save(team);
  }

  findById(id: ObjectIdType) {
    return this.repo.findOne(id);
  }
}
