import { registerAs } from '@nestjs/config';

export const rootConfig = registerAs('root', () => ({
  port: process.env.APP_PORT,
  prefix: process.env.APP_PREFIX,
  logLevel: process.env.APP_LOG_LEVEL,
  docsRoute: 'docs',
}));

export type RootConfig = ReturnType<typeof rootConfig>;
