import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    validity: { browser: process.env.JWT_VALIDITY_BROWSER, cli: process.env.JWT_VALIDITY_CLI },
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
}));

export type AuthConfig = ReturnType<typeof authConfig>;
