import { Module } from '@nestjs/common';
import { BrowserService, GlobalConfigService } from '../../lib/util';
import { Login } from './login/login.command';
import { LoginQuestions } from './login/login.questions';

@Module({
  imports: [],
  providers: [Login, BrowserService, LoginQuestions, GlobalConfigService],
  exports: [Login],
})
export class AuthModule {}
