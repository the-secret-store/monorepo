import { plainToClass } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum ScreamLevel {
  Error = 'error',
  Warn = 'warn',
  Log = 'log',
  Debug = 'debug',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV?: Environment = Environment.Development;

  @IsNumber()
  APP_PORT?: number = 5000;

  @IsString()
  APP_PREFIX?: string = '';

  @IsEnum(ScreamLevel)
  APP_LOG_LEVEL?: ScreamLevel = ScreamLevel.Debug;

  @IsString()
  DB_NAME?: string = 'tss-dev';

  @IsString()
  DB_HOST?: string = '127.0.0.1';

  @IsNumber()
  DB_PORT?: number = 27_017;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  JWT_ISSUER?: string = 'the-secret-store-hq';

  @IsString()
  JWT_VALIDITY_CLI?: string = '365d';

  @IsString()
  JWT_VALIDITY_BROWSER?: string = '24h';

  @IsString()
  SECRETS_ENCRYPTION_KEY?: string;

  @IsString()
  CLIENT_URL?: string = 'http://127.0.0.1:4200';
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    whitelist: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
