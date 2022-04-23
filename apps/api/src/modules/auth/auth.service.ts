import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '@the-secret-store/api-interfaces/dtos/user';
import { UserAgent } from '../../constants';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthTokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService
  ) {}

  async findOrCreateUser(userProfile: CreateUserInputDto) {
    const user = await this.userService.findByEmail(userProfile.email);

    if (!user) {
      return await this.userService.create(userProfile);
    }

    return user;
  }

  async generateTokenForCli(user: User) {
    const token = this.authTokenService.generateToken(user, UserAgent.CLI);
    await this.userService.addOrUpdateAccessToken(user.id, token);
    return token;
  }
}
