import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import picocolors = require('picocolors');
import { MiscConfig, RootConfig } from '../config';

export function setupApp(app: INestApplication, configService: ConfigService) {
  const config = configService.get<RootConfig>('root');
  const misc = configService.get<MiscConfig>('misc');
  const globalPrefix = config.prefix;

  app.setGlobalPrefix(globalPrefix);

  app.get(Logger).debug(`Enabling CORS for ${picocolors.cyan(misc.clientUrl)}`, 'ApplicationRoot');
  app.enableCors({
    origin: misc.clientUrl,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
}
