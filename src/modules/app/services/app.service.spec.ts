import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppEntity } from '../../../common/storage/postgres/entities/app.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppUpdateDto } from '../../../common/storage/dtos/app-update.dto';

describe('AppService', () => {
  let service: AppService;
  let repository: Repository<AppEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(AppEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 'a7358691-59ca-4431-aab6-52c3eeb4a49d',
              idClient: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
              color: 'default',
              createdAt: '2022-12-04T23:57:13.561Z',
              updatedAt: null,
            }),
            save: jest.fn().mockResolvedValue({
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

    service = module.get<AppService>(AppService);
    repository = module.get<Repository<AppEntity>>(
      getRepositoryToken(AppEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should update a specific app by its idClient', () => {
    //Arrange
    const idClient = 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092';
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
    const result = service.updateApp(idClient, newApp);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
