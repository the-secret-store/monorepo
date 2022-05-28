import { CommandFactory } from 'nest-commander';
import { AppModule } from './modules/app/app.module';
import { handleException } from './tools';

const bootstrap = async () => {
  await CommandFactory.run(AppModule, {
    cliName: 'The Secret Store',
    errorHandler: handleException,
  });
};

bootstrap();
