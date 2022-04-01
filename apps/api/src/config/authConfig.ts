import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => {
  const configurations = {
    jwt: {
      secret: process.env.JWT_SECRET,
      issuer: process.env.JWT_ISSUER,
      validity: process.env.JWT_VALIDITY,
    },

    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  };

  return configurations;
});

export type AuthConfig = ReturnType<typeof authConfig>;
