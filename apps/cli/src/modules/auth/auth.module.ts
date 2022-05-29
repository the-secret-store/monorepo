import { Module } from '@nestjs/common';
import { ApiService, BrowserService, GlobalConfigService } from '../../lib/services';
import { Login } from './login/login.command';
import { LoginQuestions } from './login/login.questions';

@Module({
  imports: [],
  providers: [Login, BrowserService, LoginQuestions, GlobalConfigService, ApiService],
  exports: [Login],
})
export class AuthModule {}
