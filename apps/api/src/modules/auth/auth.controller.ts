import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { docTags } from '../../constants/api-tags';
import { User } from '../user/user.entity';
import { CurrentUser, Protect } from './decorators';

@ApiTags(docTags.auth.name)
@Controller('auth')
export class AuthController {
  @Get('login')
  @Redirect('/auth/google')
  login() {
    // Currently since we don't have any a local strategy, I redirect to google oauth
  }

  @ApiBearerAuth()
  @Protect()
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return { message: 'Profile found', profile: user };
  }
}
