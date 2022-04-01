import { Test } from '@nestjs/testing';

import { RootService } from './root.service';

describe('RootService', () => {
  let service: RootService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [RootService],
    }).compile();

    service = app.get<RootService>(RootService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
