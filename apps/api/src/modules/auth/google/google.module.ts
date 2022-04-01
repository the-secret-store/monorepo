import { Logger, Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { AuthTokenModule } from '../token/token.module';
import { AuthTokenService } from '../token/token.service';
import { GoogleAuthController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [AuthModule, UserModule, AuthTokenModule],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy, AuthService, AuthTokenService, Logger],
})
export class GooglAuthModule {}
