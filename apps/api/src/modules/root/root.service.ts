import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  getData() {
    return { message: 'Welcome to api!' };
  }
}
