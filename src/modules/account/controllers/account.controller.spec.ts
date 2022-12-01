import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../services/account.service';

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
              return {
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
            }),
            updateCredit: jest
              .fn()
              .mockImplementation((id: string, updateCredit) => {
                return {
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

  it('should call the service method getAccountByIdClient ', () => {
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
    const result = controller.getAccountByIdClient(idClient);
    //Assert
    // expect(result).resolves.toEqual(expected);
    // expect(service.updateCredit).toHaveBeenCalled();
    expect(service.getAccountByIdClient).toHaveBeenCalled();
  });

  it('should call the service method updateCredit ', () => {
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
    const result = controller.updateCreditByIdClient(idClient);
    //Assert
    // expect(result).resolves.toEqual(expected);
    expect(service.updateCredit).toHaveBeenCalled();
  });
});
