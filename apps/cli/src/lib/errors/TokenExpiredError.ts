export class TokenExpired extends Error {
  constructor() {
    super();
    this.name = 'TokenExpiredError';
  }
}
