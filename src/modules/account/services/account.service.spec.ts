import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AccountService } from './account.service';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';

describe('AccountService', () => {
  let service: AccountService;
  let repository: Repository<AccountEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
              idClient: '35493920-66f5-4c87-8557-a3a9c03d25c9',
              balance: '10000',
              credit: '10000',
              state: 1,
              createdAt: '2022-12-05T00:01:11.947Z',
              updatedAt: null,
              deletedAt: null,
              movementsIncome: [
                {
                  id: '2231add1-9d71-432d-a8b2-0814a426edba',
                  idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  reason: 'food',
                  amount: '100000',
                  fees: 60,
                  date: '2022-12-05T03:23:32.802Z',
                },
              ],
              movementsOutcome: [
                {
                  id: '2231add1-9d71-432d-a8b2-0814a426edba',
                  idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  reason: 'food',
                  amount: '100000',
                  fees: 60,
                  date: '2022-12-05T03:23:32.802Z',
                },
              ],
            }),
            save: jest.fn().mockResolvedValue({
              id: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
              idClient: '35493920-66f5-4c87-8557-a3a9c03d25c9',
              balance: '15000',
              credit: '20500',
              state: 1,
              createdAt: '2022-12-05T00:01:11.947Z',
              updatedAt: null,
              deletedAt: null,
              movementsIncome: [
                {
                  id: '2231add1-9d71-432d-a8b2-0814a426edba',
                  idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  reason: 'food',
                  amount: '100000',
                  fees: 60,
                  date: '2022-12-05T03:23:32.802Z',
                },
              ],
              movementsOutcome: [
                {
                  id: '2231add1-9d71-432d-a8b2-0814a426edba',
                  idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
                  reason: 'food',
                  amount: '100000',
                  fees: 60,
                  date: '2022-12-05T03:23:32.802Z',
                },
              ],
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    repository = module.get<Repository<AccountEntity>>(
      getRepositoryToken(AccountEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should fetch a specific account by its idClient', () => {
    //Arrange
    const idClient = '35493920-66f5-4c87-8557-a3a9c03d25c9';

    const expected = {
      id: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
      idClient: '35493920-66f5-4c87-8557-a3a9c03d25c9',
      balance: '10000',
      credit: '10000',
      state: 1,
      createdAt: '2022-12-05T00:01:11.947Z',
      updatedAt: null,
      deletedAt: null,
      movementsIncome: [
        {
          id: '2231add1-9d71-432d-a8b2-0814a426edba',
          idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          reason: 'food',
          amount: '100000',
          fees: 60,
          date: '2022-12-05T03:23:32.802Z',
        },
      ],
      movementsOutcome: [
        {
          id: '2231add1-9d71-432d-a8b2-0814a426edba',
          idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          reason: 'food',
          amount: '100000',
          fees: 60,
          date: '2022-12-05T03:23:32.802Z',
        },
      ],
    };
    //Act
    const result = service.getAccountByIdClient(idClient);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should update a specific account by its idClient', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';
    const updateAccount: AccountUpdateDto = {
      balance: '15000',
      credit: '20500',
      id: '',
      idClient: '',
      state: 0,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
      client: undefined,
      movementsIncome: [],
      movementsOutcome: [],
    };

    const expected = {
      id: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
      idClient: '35493920-66f5-4c87-8557-a3a9c03d25c9',
      balance: '15000',
      credit: '20500',
      state: 1,
      createdAt: '2022-12-05T00:01:11.947Z',
      updatedAt: null,
      deletedAt: null,
      movementsIncome: [
        {
          id: '2231add1-9d71-432d-a8b2-0814a426edba',
          idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          reason: 'food',
          amount: '100000',
          fees: 60,
          date: '2022-12-05T03:23:32.802Z',
        },
      ],
      movementsOutcome: [
        {
          id: '2231add1-9d71-432d-a8b2-0814a426edba',
          idIncome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
          reason: 'food',
          amount: '100000',
          fees: 60,
          date: '2022-12-05T03:23:32.802Z',
        },
      ],
    };
    //Act
    const result = service.updateAccount(idClient, updateAccount);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
