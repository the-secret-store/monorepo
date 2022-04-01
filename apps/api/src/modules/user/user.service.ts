import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInputDto } from '@the-secret-store/api-interfaces/dtos/user';
import { ObjectID as ObjectIdType, Repository } from 'typeorm';
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

  async addProject(user: ObjectIdType | string | User, projectId: ObjectIdType) {
    if (user instanceof ObjectIdType) user = await this.findById(user);
    else if (typeof user === 'string') user = await this.findByEmail(user);

    user.projects.push(projectId);
    return this.repo.save(user);
  }

  findById(id: ObjectIdType) {
    return this.repo.findOne({ where: id });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
