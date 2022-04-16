import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { CreateUserInputDto } from '@the-secret-store/api-interfaces/dtos/user';
import { Profile, Strategy as GooglePassportOauthStrategy } from 'passport-google-oauth20';
import { AuthConfig, RootConfig } from '../../../config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(GooglePassportOauthStrategy, 'google') {
  constructor(configService: ConfigService, private readonly authService: AuthService) {
    super({
      clientID: configService.get<AuthConfig>('auth').google.clientId,
      clientSecret: configService.get<AuthConfig>('auth').google.clientSecret,
      callbackURL: `http://localhost:${
        configService.get<RootConfig>('root').port
      }/auth/google/success`,
      scope: ['email', 'profile'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { name, emails, photos } = profile;

    const userProfile: CreateUserInputDto = {
      displayName: name.givenName,
      email: emails[0].value,
      avatarUrl: photos[0].value,
    };

    const user = await this.authService.handleOauthLogin(userProfile);

    return user;
  }
}
