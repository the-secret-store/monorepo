import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfig } from '../../../config';
import { prettyPrint } from '../../../utils';
import { User } from '../../user/user.entity';

export type AuthPayload = Pick<User, 'id' | 'avatarUrl' | 'displayName' | 'email'>;

@Injectable()
export class AuthTokenStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>('auth').jwt.secret,
    });
  }

  async validate(payload: AuthPayload) {
    Logger.verbose(prettyPrint(payload), AuthTokenStrategy.name);
    return payload;
  }
}
