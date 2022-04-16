import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prettyPrint } from '../../../utils';
import { User } from '../../user/user.entity';
import { AuthPayload } from './token.strategy';

@Injectable()
export class AuthTokenService {
  constructor(private jwtService: JwtService, private readonly logger: Logger) {}

  generateToken(user: User) {
    const { avatarUrl, displayName, email, id }: AuthPayload = user;

    this.logger.verbose(
      `User ${user.displayName} has logged in: ${prettyPrint(
        user as unknown as Record<string, string>
      )}`,
      AuthTokenService.name
    );

    return this.jwtService.sign({ avatarUrl, displayName, email, id });
  }
}
