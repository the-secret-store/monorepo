import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { prettyPrint } from '@the-secret-store/util/console';
import { UserAgent } from '../../../constants';
import { AuthConfig } from '../../../config';
import { User } from '../../user/user.entity';
import { AuthPayload } from './token.strategy';

@Injectable()
export class AuthTokenService {
  jwtConfig: AuthConfig['jwt'];
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    configService: ConfigService
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

  validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
