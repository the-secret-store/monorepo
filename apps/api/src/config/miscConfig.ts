import { registerAs } from '@nestjs/config';

export const miscConfig = registerAs('misc', () => ({
  encryptionKey: process.env.SECRETS_ENCRYPTION_KEY,
}));

export type MiscConfig = ReturnType<typeof miscConfig>;
