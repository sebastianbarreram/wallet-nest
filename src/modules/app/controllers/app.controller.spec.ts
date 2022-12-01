import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            updateApp: jest
              .fn()
              .mockImplementation((id: string, updateCredit) => {
                return {};
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service method updateApp ', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';
    const newApp = {
      color: 'green',
    };
    //Act
    const result = controller.updateApp(idClient, newApp);
    //Assert
    // expect(result).resolves.toEqual(expected);
    // expect(service.updateCredit).toHaveBeenCalled();
    expect(service.updateApp).toHaveBeenCalled();
  });
});
