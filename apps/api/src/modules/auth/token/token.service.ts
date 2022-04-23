import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserAgent } from '../../../constants';
import { AuthConfig } from '../../../config';
import { prettyPrint } from '../../../utils';
import { User } from '../../user/user.entity';
import { AuthPayload } from './token.strategy';

@Injectable()
export class AuthTokenService {
  jwtConfig: AuthConfig['jwt'];
  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
    private readonly logger: Logger
  ) {
    this.jwtConfig = configService.get<AuthConfig>('auth').jwt;
  }

  generateToken(user: User, userAgent: UserAgent) {
    const { avatarUrl, displayName, email, id }: AuthPayload = user;

    this.logger.verbose(
      `User ${user.displayName} has logged in: ${prettyPrint(
        user as unknown as Record<string, string>
      )}`,
      AuthTokenService.name
    );

    return this.jwtService.sign(
      { avatarUrl, displayName, email, id },
      { expiresIn: this.jwtConfig.validity[userAgent] }
    );
  }
}
