export class AuthenticationError extends Error {
  constructor(message: string, error?: Error) {
    super(message);
    this.name = 'UnauthorizedError';
    this.stack = error?.stack;
  }
}
