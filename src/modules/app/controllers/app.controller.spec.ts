import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { AppUpdateDto } from '../../../common/storage/dtos/app-update.dto';

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
            updateApp: jest.fn().mockResolvedValue({
              id: 'a7358691-59ca-4431-aab6-52c3eeb4a49d',
              idClient: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
              color: 'green',
              createdAt: '2022-12-04T23:57:13.561Z',
              updatedAt: '2022-12-06T12:36:09.342Z',
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

  it('should update a specific app by its idClient', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';
    const newApp: AppUpdateDto = {
      color: 'green',
      id: '',
      idClient: '',
      createdAt: undefined,
      updatedAt: undefined,
      client: undefined,
    };
    const expected = {
      id: 'a7358691-59ca-4431-aab6-52c3eeb4a49d',
      idClient: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
      color: 'green',
      createdAt: '2022-12-04T23:57:13.561Z',
      updatedAt: '2022-12-06T12:36:09.342Z',
    };
    //Act
    const result = controller.updateApp(idClient, newApp);
    //Assert
    expect(service.updateApp).toHaveBeenCalled();
    expect(result).resolves.toEqual(expected);
  });
});
