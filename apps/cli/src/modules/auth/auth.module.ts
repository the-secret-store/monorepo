import { Module } from '@nestjs/common';
import { Login } from './login/login.command';

@Module({
  imports: [],
  providers: [Login],
  exports: [Login],
})
export class AuthModule {}
