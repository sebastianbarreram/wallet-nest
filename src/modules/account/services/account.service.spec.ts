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
              id: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
              idClient: '662fc9f8-17be-43fc-bb1d-3627982d3381',
              balance: '10060000',
              credit: '40000000',
              state: 1,
              createdAt: '2022-12-15T03:09:29.001Z',
              updatedAt: '2022-12-14T22:14:08.594Z',
              deletedAt: null,
              client: {
                id: '662fc9f8-17be-43fc-bb1d-3627982d3381',
                fullName: 'Santiago',
                email: 'sa@sa.com',
                phone: '4528963152',
                photo:
                  'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
                state: 1,
                createdAt: '2022-12-14T22:09:28.146Z',
                updatedAt: null,
                app: {
                  id: '4272c022-f8c2-467f-aabd-1ba6f7af8a2d',
                  color: '#1554F7',
                },
                deletedAt: null,
              },
              movementsIncome: [
                {
                  id: '11ffb16d-8240-4a59-91fd-bd1409117996',
                  idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
                  idOutcome: '27acf227-382d-406f-841a-824f68739103',
                  reason: 'Pay gas',
                  amount: '60000',
                  fees: 1,
                  date: '2022-12-15T03:14:09.620Z',
                },
                {
                  id: '317f7c61-5e50-4ca7-86ae-452a90480a9d',
                  idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
                  idOutcome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
                  reason: 'Trip Colombia',
                  amount: '10000000',
                  fees: 60,
                  date: '2022-12-15T03:10:43.579Z',
                },
              ],
              movementsOutcome: [
                {
                  id: '317f7c61-5e50-4ca7-86ae-452a90480a9d',
                  idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
                  idOutcome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
                  reason: 'Trip Colombia',
                  amount: '10000000',
                  fees: 60,
                  date: '2022-12-15T03:10:43.579Z',
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

  it('should fetch a specific account by its idClient', async () => {
    //Arrange
    const idClient = '662fc9f8-17be-43fc-bb1d-3627982d3381';

    const expected = {
      id: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
      idClient: '662fc9f8-17be-43fc-bb1d-3627982d3381',
      balance: '10060000',
      credit: '40000000',
      state: 1,
      createdAt: '2022-12-15T03:09:29.001Z',
      updatedAt: '2022-12-14T22:14:08.594Z',
      deletedAt: null,
      client: {
        id: '662fc9f8-17be-43fc-bb1d-3627982d3381',
        fullName: 'Santiago',
        email: 'sa@sa.com',
        phone: '4528963152',
        photo:
          'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
        state: 1,
        createdAt: '2022-12-14T22:09:28.146Z',
        updatedAt: null,
        app: {
          id: '4272c022-f8c2-467f-aabd-1ba6f7af8a2d',
          color: '#1554F7',
        },
        deletedAt: null,
      },
    };
    //Act
    const result = await service.getAccountByIdClient(idClient);
    const fixResult = {
      id: result.id,
      idClient: result.idClient,
      balance: result.balance,
      credit: result.credit,
      state: result.state,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
      client: result.client,
    };

    //Assert
    expect(Promise.resolve(fixResult)).resolves.toEqual(expected);
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

  it('should fetch a specific client photo by its idAccount', () => {
    //Arrange
    const id = '648ab7d1-bd49-4cfa-8a84-322449cae19d';

    const expected = {
      id: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
      photo:
        'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
    };
    //Act
    const result = service.getClientPhotoByAccountId(id);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should fetch the specific account movements by its idAccount', () => {
    //Arrange
    const id = '648ab7d1-bd49-4cfa-8a84-322449cae19d';

    const expected = [
      {
        id: '11ffb16d-8240-4a59-91fd-bd1409117996',
        idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
        idOutcome: '27acf227-382d-406f-841a-824f68739103',
        reason: 'Pay gas',
        amount: '60000',
        fees: 1,
        date: '2022-12-15T03:14:09.620Z',
      },
      {
        id: '317f7c61-5e50-4ca7-86ae-452a90480a9d',
        idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
        idOutcome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
        reason: 'Trip Colombia',
        amount: '10000000',
        fees: 60,
        date: '2022-12-15T03:10:43.579Z',
      },
    ];
    //Act
    const result = service.getMovementsByAccountId(id);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should fetch the specific photo clients in movements by its idAccount', () => {
    //Arrange
    const id = '648ab7d1-bd49-4cfa-8a84-322449cae19d';

    const expected = [
      {
        id: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
        photo:
          'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
      },
      {
        id: '27acf227-382d-406f-841a-824f68739103',
        photo:
          'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
      },
    ];
    //Act
    const result = service.getMovementPhotosByAccountId(id);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should fetch a specific account with all information by its idAccount', async () => {
    //Arrange
    const id = '648ab7d1-bd49-4cfa-8a84-322449cae19d';

    const expected = {
      account: {
        id: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
        idClient: '662fc9f8-17be-43fc-bb1d-3627982d3381',
        balance: '10060000',
        credit: '40000000',
        state: 1,
        createdAt: '2022-12-15T03:09:29.001Z',
        updatedAt: '2022-12-14T22:14:08.594Z',
        deletedAt: null,
        client: {
          id: '662fc9f8-17be-43fc-bb1d-3627982d3381',
          fullName: 'Santiago',
          email: 'sa@sa.com',
          phone: '4528963152',
          photo:
            'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
          state: 1,
          createdAt: '2022-12-14T22:09:28.146Z',
          updatedAt: null,
          app: {
            color: '#1554F7',
            id: '4272c022-f8c2-467f-aabd-1ba6f7af8a2d',
          },
          deletedAt: null,
        },
        movementsIncome: [
          {
            amount: '60000',
            date: '2022-12-15T03:14:09.620Z',
            fees: 1,
            id: '11ffb16d-8240-4a59-91fd-bd1409117996',
            idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
            idOutcome: '27acf227-382d-406f-841a-824f68739103',
            reason: 'Pay gas',
          },
          {
            amount: '10000000',
            date: '2022-12-15T03:10:43.579Z',
            fees: 60,
            id: '317f7c61-5e50-4ca7-86ae-452a90480a9d',
            idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
            idOutcome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
            reason: 'Trip Colombia',
          },
        ],
        movementsOutcome: [
          {
            amount: '10000000',
            date: '2022-12-15T03:10:43.579Z',
            fees: 60,
            id: '317f7c61-5e50-4ca7-86ae-452a90480a9d',
            idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
            idOutcome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
            reason: 'Trip Colombia',
          },
        ],
      },
      movements: [
        {
          id: '11ffb16d-8240-4a59-91fd-bd1409117996',
          idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
          idOutcome: '27acf227-382d-406f-841a-824f68739103',
          reason: 'Pay gas',
          amount: '60000',
          fees: 1,
          date: '2022-12-15T03:14:09.620Z',
        },
        {
          id: '317f7c61-5e50-4ca7-86ae-452a90480a9d',
          idIncome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
          idOutcome: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
          reason: 'Trip Colombia',
          amount: '10000000',
          fees: 60,
          date: '2022-12-15T03:10:43.579Z',
        },
      ],
      images: [
        {
          id: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
          photo:
            'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
        },
        {
          id: '27acf227-382d-406f-841a-824f68739103',
          photo:
            'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
        },
      ],
    };
    //Act
    const result = await service.getFullAccount(id);
    const fixResult = {
      account: result.account,
      movements: result.movements,
      images: result.images,
    };
    //Assert
    expect(Promise.resolve(fixResult)).resolves.toEqual(expected);
  });

  it('should fetch a specific account by its idAccount', async () => {
    //Arrange
    const idAccount = ' e4b2645b-b3b2-4799-8ca6-8cd0123069ee';

    const expected = {
      id: 'e4b2645b-b3b2-4799-8ca6-8cd0123069ee',
      idClient: '662fc9f8-17be-43fc-bb1d-3627982d3381',
      balance: '10060000',
      credit: '40000000',
      state: 1,
      createdAt: '2022-12-15T03:09:29.001Z',
      updatedAt: '2022-12-14T22:14:08.594Z',
      deletedAt: null,
      client: {
        id: '662fc9f8-17be-43fc-bb1d-3627982d3381',
        fullName: 'Santiago',
        email: 'sa@sa.com',
        phone: '4528963152',
        photo:
          'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
        state: 1,
        createdAt: '2022-12-14T22:09:28.146Z',
        updatedAt: null,
        app: {
          id: '4272c022-f8c2-467f-aabd-1ba6f7af8a2d',
          color: '#1554F7',
        },
        deletedAt: null,
      },
    };
    //Act
    const result = await service.getAccountByIdAccount(idAccount);
    const fixResult = {
      id: result.id,
      idClient: result.idClient,
      balance: result.balance,
      credit: result.credit,
      state: result.state,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
      client: result.client,
    };

    //Assert
    expect(Promise.resolve(fixResult)).resolves.toEqual(expected);
  });
});
