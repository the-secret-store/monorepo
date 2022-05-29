import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './modules/app/app.module';

const bootstrap = async () => {
  await CommandFactory.run(
    AppModule,
    !+process.env.CLI_DEV_FLAG ? { logger: false } : new Logger()
  );
};

bootstrap();
