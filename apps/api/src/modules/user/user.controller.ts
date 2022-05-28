import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { docTags } from '../../constants/api-tags';
import { CurrentUser, Protect } from '../auth/decorators';
import { AuthPayload } from '../auth/token/token.strategy';
import { UserService } from './user.service';

@ApiTags(docTags.user.name)
@ApiBearerAuth()
@Protect()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/generate-token')
  @Redirect('/auth/generate-token', HttpStatus.MOVED_PERMANENTLY)
  redirect() {
    //
  }

  @Get('/profile')
  async getUserProfile(@CurrentUser() tokenInfo: AuthPayload) {
    const user = await this.userService.findById(tokenInfo.id);
    return { message: 'Profile found', result: user };
  }
}
