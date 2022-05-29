export class TokenExpired extends Error {
  constructor() {
    super('Access Token has expired, please login again.');
    this.name = 'TokenExpiredError';
  }
}
