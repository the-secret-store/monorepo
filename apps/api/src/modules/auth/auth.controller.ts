import { BadRequestException, Body, Controller, Get, Redirect } from '@nestjs/common';
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
    // alias route fot Google Oauth2 login
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
    try {
      await this.authService.validateToken(token);
      return { message: 'Token is valid' };
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  @Get('generate-token')
  @ApiBearerAuth()
  @Protect()
  async generateToken(@CurrentUser() user: AuthPayload) {
    const token = await this.authService.generateTokenForCli(user as User);
    return { message: 'Token generated successfully', result: token };
  }
}
