import { INestApplication, Logger } from '@nestjs/common';

declare const module: {
  hot: {
    accept: (cb: (something: unknown) => void) => void;
    dispose: (cb: () => void) => void;
  };
};

export function setupHMR(app: INestApplication) {
  if (module.hot) {
    const logger = app.get(Logger);
    logger.log('Hot Module Replacement is enabled', 'ApplicationRoot');

    module.hot.accept(something => logger.verbose(something));
    module.hot.dispose(() => {
      logger.log('Gracefully shutting down server...', 'ApplicationRoot');
      app.close();
    });
  }
}
