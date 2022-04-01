import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RootConfig } from '../config';

export function setupApp(app: INestApplication, configService: ConfigService) {
  const config = configService.get<RootConfig>('root');
  const globalPrefix = config.prefix;

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
}
