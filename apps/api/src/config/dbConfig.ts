import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

  name: process.env.DB_NAME,
}));

export type DatabaseConfig = ReturnType<typeof databaseConfig>;
