import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { MiscConfig } from '../../../config';
import { docTags, UserAgent } from '../../../constants';
import { User } from '../../user/user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthTokenService } from '../token/token.service';
import { GoogleAuthGuard } from './google.guard';

@ApiTags(docTags.auth.name)
@Controller('auth/google')
export class GoogleAuthController {
  miscConfig: MiscConfig;

  constructor(
    private readonly authTokenService: AuthTokenService,
    readonly configService: ConfigService
  ) {
    this.miscConfig = this.configService.get<MiscConfig>('misc');
  }

  @Get()
  @UseGuards(GoogleAuthGuard)
  login() {
    // Guard handles login
  }

  @Get('success')
  @UseGuards(GoogleAuthGuard)
  success(@CurrentUser() user: User, @Res() res: Response) {
    const token = this.authTokenService.generateToken(user, UserAgent.Browser);
    res.redirect(`${this.miscConfig.clientUrl}/auth/login?token=${token}`);
    // return { message: 'Login successful', token };
  }
}
