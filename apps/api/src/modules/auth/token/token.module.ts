import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from '../../../config';
import { AuthTokenService } from './token.service';
import { AuthTokenStrategy } from './token.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = configService.get<AuthConfig>('auth').jwt;
        return {
          secret: jwtConfig.secret,
          signOptions: {
            issuer: jwtConfig.issuer,
            algorithm: 'ES256',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthTokenStrategy, AuthTokenService, Logger],
  exports: [JwtModule, AuthTokenService],
})
export class AuthTokenModule {}
