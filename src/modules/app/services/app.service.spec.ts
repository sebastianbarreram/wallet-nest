import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a specific app by its idClient', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';
    const newApp = {
      color: 'green',
    };

    const expected = {
      id: 'b36a554b-6948-42b6-a177-56fee24814fb',
      idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
      updatedAt: null,
      deletedAt: null,
      balance: '0',
      credit: '49000000',
      state: 1,
      createdAt: '2022-12-01T21:29:01.414Z',
      incomes: [],
      outcomes: [],
    };
    //Act
    const result = service.updateApp(idClient, newApp);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
