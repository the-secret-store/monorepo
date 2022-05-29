import { Body, Controller, Get, Redirect } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Deprecated } from '@the-secret-store/util';
import { docTags } from '../../constants/api-tags';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser, Protect } from './decorators';
import { AuthPayload } from './token/token.strategy';

@ApiTags(docTags.auth.name)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Redirect('/auth/google')
  login() {
    // Currently since we don't have any a local strategy, I redirect to google oauth
  }

  @ApiBearerAuth()
  @Protect()
  @Get('profile')
  @Deprecated('This was only added for testing purpose', 'Use getUserDetails from user module')
  getProfile(@CurrentUser() user: User) {
    return { message: 'Profile found', profile: user };
  }

  @Get('validate-token')
  async validateToken(@Body('token') token: string) {
    await this.authService.validateToken(token);
    return { message: 'Token is valid' };
  }

  @Get('generate-token')
  @ApiBearerAuth()
  @Protect()
  async generateToken(@CurrentUser() user: AuthPayload) {
    const token = await this.authService.generateTokenForCli(user as User);
    return { message: 'Token generated successfully', result: token };
  }
}
