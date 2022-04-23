import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInputDto } from '@the-secret-store/api-interfaces/dtos/user';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
import { Deprecated } from '../../decorators';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(createUserDto: CreateUserInputDto) {
    const user = this.repo.create(createUserDto);
    await this.repo.save(user);
    return user;
  }

  async addTeam(user: ObjectIdType | User, teamId: ObjectIdType) {
    if (!(user instanceof User)) user = await this.findById(user);
    user.teams.push(teamId);
    return this.repo.save(user);
  }

  async addProject(user: ObjectIdType | User, projectId: ObjectIdType) {
    if (!(user instanceof User)) user = await this.findById(user);

    user.projects.push(projectId);
    return this.repo.save(user);
  }

  findById(id: ObjectIdType) {
    return this.repo.findOne({ where: id });
  }

  findByEmail(email: Email) {
    return this.repo.findOne({ where: { email } });
  }

  @Deprecated('storing user sessions in a database is a huge security flaw')
  async addOrUpdateAccessToken(userId: ObjectIdType, accessToken: string) {
    const user = await this.repo.findOne({ where: { id: userId } });
    user.accessToken = accessToken;
    return this.repo.save(user);
  }
}

type Email = string;
