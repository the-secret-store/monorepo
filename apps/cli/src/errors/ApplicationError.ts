export class ApplicationError extends Error {
  constructor(message: string, error?: Error) {
    super(message);
    this.name = 'ApplicationError';
    this.stack = error?.stack;
  }
}
