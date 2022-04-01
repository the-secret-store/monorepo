import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from '@the-secret-store/api-interfaces/dtos/user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async handleOauthLogin(userProfile: CreateUserInputDto) {
    const user = await this.userService.findByEmail(userProfile.email);

    if (!user) {
      return await this.userService.create(userProfile);
    }

    return user;
  }
}
