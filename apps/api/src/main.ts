import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as pc from 'picocolors';
import { RootConfig } from './config';
import { RootModule } from './modules/root/root.module';
import { setupApp, setupDocs, setupHMR } from './setup';
import { Scream } from './tools/scream';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, {
    logger: new Scream(),
  });

  const configService = app.get(ConfigService);
  const logger = app.get(Logger);

  setupApp(app, configService);
  setupDocs(app);

  const { port } = configService.get<RootConfig>('root');
  await app.listen(port);

  setupHMR(app);

  logger.log(`Application is running on: ${pc.blue(await app.getUrl())}`, 'ApplicationRoot');
}

bootstrap();
