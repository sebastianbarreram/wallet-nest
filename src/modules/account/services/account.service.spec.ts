import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch a specific account by its idClient', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';

    const expected = {
      id: 'b36a554b-6948-42b6-a177-56fee24814fb',
      idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
      updatedAt: null,
      deletedAt: null,
      balance: '0',
      credit: '50000000',
      state: 1,
      createdAt: '2022-12-01T21:29:01.414Z',
      incomes: [],
      outcomes: [],
    };
    //Act
    const result = service.getAccountByIdClient(idClient);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should update credit from a specific account by its idClient', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';
    const updateCredit = {
      credit: '49000000',
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
    const result = service.updateCredit(idClient, updateCredit);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
