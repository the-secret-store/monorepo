export class ClientError extends Error {
  constructor(message: string, error?: Error) {
    super(message);
    this.name = 'ClientError';
    this.stack = error?.stack;
  }
}
