import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../services/account.service';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            getAccountByIdClient: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve({
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
              });
            }),
            updateAccount: jest
              .fn()
              .mockImplementation(
                (id: string, updateAccount: AccountUpdateDto) => {
                  return Promise.resolve({
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
                  });
                },
              ),
            getFullAccount: jest.fn().mockImplementation((id: string) => {
              return Promise.resolve({
                id: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
                idClient: '09feaa0a-3783-49f4-809b-3fbfe89e511b',
                balance: '10000000',
                credit: '50000000',
                state: 1,
                createdAt: '2022-12-14T23:35:23.942Z',
                updatedAt: '2022-12-14T18:39:26.110Z',
                deletedAt: null,
                movementsIncome: [
                  {
                    id: '69f895ed-7d5d-4e5e-8757-3bcd9cf15a16',
                    idIncome: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
                    idOutcome: '27acf227-382d-406f-841a-824f68739103',
                    reason: 'Pay loan',
                    amount: '10000000',
                    fees: 1,
                    date: '2022-12-14T23:39:27.102Z',
                  },
                ],
                movementsOutcome: [],
                movements: [
                  {
                    id: '69f895ed-7d5d-4e5e-8757-3bcd9cf15a16',
                    idIncome: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
                    idOutcome: '27acf227-382d-406f-841a-824f68739103',
                    reason: 'Pay loan',
                    amount: '10000000',
                    fees: 1,
                    date: '2022-12-14T23:39:27.102Z',
                  },
                ],
                images: [
                  {
                    id: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
                    photo:
                      'https://s.gravatar.com/avatar/d10ca8d11301c2f4993ac2279ce4b930?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fa.png',
                  },
                  {
                    id: '27acf227-382d-406f-841a-824f68739103',
                    photo:
                      'https://lh3.googleusercontent.com/a/AEdFTp7PlxTCtt1xTk24oxFRQj9j8nVLojac1Y_g3MYEOw=s96-c',
                  },
                ],
              });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should fetch a specific account by its idClient', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';

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
    const result = controller.getAccountByIdClient(idClient);
    //Assert
    expect(service.getAccountByIdClient).toHaveBeenCalled();
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
    const result = controller.updateAccountByIdClient(idClient, updateAccount);
    //Assert
    expect(result).resolves.toEqual(expected);
    expect(service.updateAccount).toHaveBeenCalled();
  });

  it('should fetch a specific account with all information by its idAccount', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';

    const expected = {
      id: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
      idClient: '09feaa0a-3783-49f4-809b-3fbfe89e511b',
      balance: '10000000',
      credit: '50000000',
      state: 1,
      createdAt: '2022-12-14T23:35:23.942Z',
      updatedAt: '2022-12-14T18:39:26.110Z',
      deletedAt: null,
      movementsIncome: [
        {
          id: '69f895ed-7d5d-4e5e-8757-3bcd9cf15a16',
          idIncome: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
          idOutcome: '27acf227-382d-406f-841a-824f68739103',
          reason: 'Pay loan',
          amount: '10000000',
          fees: 1,
          date: '2022-12-14T23:39:27.102Z',
        },
      ],
      movementsOutcome: [],
      movements: [
        {
          id: '69f895ed-7d5d-4e5e-8757-3bcd9cf15a16',
          idIncome: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
          idOutcome: '27acf227-382d-406f-841a-824f68739103',
          reason: 'Pay loan',
          amount: '10000000',
          fees: 1,
          date: '2022-12-14T23:39:27.102Z',
        },
      ],
      images: [
        {
          id: '4930c3e9-1c49-45a4-8439-b2d574c106e5',
          photo:
            'https://s.gravatar.com/avatar/d10ca8d11301c2f4993ac2279ce4b930?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fa.png',
        },
        {
          id: '27acf227-382d-406f-841a-824f68739103',
          photo:
            'https://lh3.googleusercontent.com/a/AEdFTp7PlxTCtt1xTk24oxFRQj9j8nVLojac1Y_g3MYEOw=s96-c',
        },
      ],
    };
    //Act
    const result = controller.getFullAccount(idClient);
    //Assert
    expect(result).resolves.toEqual(expected);
    expect(service.getFullAccount).toHaveBeenCalled();
  });
});
