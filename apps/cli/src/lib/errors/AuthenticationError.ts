export class AuthenticationError extends Error {
  constructor(message: string, error?: Error) {
    super(message);
    this.name = 'AuthenticationError';
    this.stack = error?.stack;
  }
}
