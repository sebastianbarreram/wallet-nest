import { Test, TestingModule } from '@nestjs/testing';
import { MainService } from '../services/main.service';
import { MainController } from './main.controller';

describe('MainController', () => {
  let mainController: MainController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [MainService],
    }).compile();

    mainController = app.get<MainController>(MainController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mainController.getHello()).toBe('Hello World!');
    });
  });
});
