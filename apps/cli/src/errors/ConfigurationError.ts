export class ConfigurationError extends Error {
  constructor(error?: Error) {
    super(
      'Either configuration does not exist or malformed. Remove the configuration file ($HOME/.tssrc) and login again to resolve.'
    );
    this.name = 'ConfigurationError';
    this.stack = error?.stack;
  }
}
