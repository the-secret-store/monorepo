import { Test, TestingModule } from '@nestjs/testing';

import { RootController } from './root.controller';
import { RootService } from './root.service';

describe('RootController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [RootController],
      providers: [RootService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const rootController = app.get<RootController>(RootController);
      expect(rootController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
