import { LogLevel } from '@nestjs/common';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      APP_PORT: number;
      APP_PREFIX: string;
      APP_LOG_LEVEL: LogLevel;

      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: number;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      JWT_SECRET: string;
      JWT_ISSUER: string;
      JWT_VALIDITY_BROWSER: string;
      JWT_VALIDITY_CLI: string;
    }
  }
}

export {};
