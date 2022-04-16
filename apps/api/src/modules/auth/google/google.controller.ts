import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { docTags } from '../../../constants/api-tags';
import { User } from '../../user/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthTokenService } from '../token/token.service';
import { GoogleAuthGuard } from './google.guard';

@ApiTags(docTags.auth.name)
@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly authTokenService: AuthTokenService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  login() {
    // Guard handles login
  }

  @Get('success')
  @UseGuards(GoogleAuthGuard)
  success(@CurrentUser() user: User) {
    const token = this.authTokenService.generateToken(user);
    return { message: 'Login successful', token };
  }
}
