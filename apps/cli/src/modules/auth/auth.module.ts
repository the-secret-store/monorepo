import { Module } from '@nestjs/common';
import { BrowserService } from '../../lib/util';
import { Login } from './login/login.command';
import { LoginQuestions } from './login/login.questions';

@Module({
  imports: [],
  providers: [Login, BrowserService, LoginQuestions],
  exports: [Login],
})
export class AuthModule {}
