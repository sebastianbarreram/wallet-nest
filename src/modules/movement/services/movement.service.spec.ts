import { Test, TestingModule } from '@nestjs/testing';
import { MovementService } from './movement.service';
import { MovementEntity } from '../../../common/storage/postgres/entities/movement.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';
import { AccountService } from '../../account/services/account.service';

describe('MovementService', () => {
  let movementService: MovementService;
  let repository: Repository<MovementEntity>;
  let accountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementService,
        {
          provide: getRepositoryToken(MovementEntity),
          useValue: {
            save: jest.fn(
              (client: MovementCreateDto): Promise<MovementEntity> => {
                if (client.idIncome === client.idOutcome) {
                  const result: MovementEntity = {
                    id: '8557760e-391e-4cb1-af3d-7df017621331',
                    idIncome: '195f920e-a97c-4f36-aa86-d58d81215343',
                    idOutcome: '195f920e-a97c-4f36-aa86-d58d81215343',
                    reason: "Mateo's consultant services 3",
                    amount: 1000,
                    fees: 60,
                    date: new Date('2022-12-06T06:51:55.613Z'),
                    income: undefined,
                    outcome: undefined,
                  };

                  return Promise.resolve(result);
                }
                return Promise.resolve({
                  id: '8557760e-391e-4cb1-af3d-7df017621331',
                  idIncome: client.idIncome,
                  idOutcome: client.idOutcome,
                  reason: client.reason,
                  amount: client.amount,
                  fees: 1,
                  date: new Date('2022-12-06T06:51:55.613Z'),
                  income: undefined,
                  outcome: undefined,
                });
              },
            ),
          },
        },
        {
          provide: AccountService,
          useValue: {
            getAccountByIdAccount: jest.fn().mockResolvedValue({
              id: '195f920e-a97c-4f36-aa86-d58d81215343',
              idClient: 'c10dc24d-a4c8-474b-b143-d6260a11bd05',
              balance: '30410000',
              credit: '25590000',
              state: 1,
              createdAt: '2022-12-09T21:05:23.696Z',
              updatedAt: '2022-12-09T23:43:03.306Z',
              deletedAt: null,
            }),
            updateAccount: jest.fn(),
          },
        },
      ],
    }).compile();

    movementService = module.get<MovementService>(MovementService);
    repository = module.get<Repository<MovementEntity>>(
      getRepositoryToken(MovementEntity),
    );
    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(movementService).toBeDefined();
    expect(repository).toBeDefined();
    expect(accountService).toBeDefined();
  });

  it('should store a loan movement', () => {
    //Arrange
    const newMovement: MovementCreateDto = {
      idIncome: '195f920e-a97c-4f36-aa86-d58d81215343',
      idOutcome: '195f920e-a97c-4f36-aa86-d58d81215343',
      reason: "Mateo's consultant services 3",
      amount: 1000,
      fees: 60,
      id: '',
      date: new Date('2022-12-06T06:51:55.613Z'),
    };

    const expected: MovementEntity = {
      id: '8557760e-391e-4cb1-af3d-7df017621331',
      idIncome: '195f920e-a97c-4f36-aa86-d58d81215343',
      idOutcome: '195f920e-a97c-4f36-aa86-d58d81215343',
      reason: "Mateo's consultant services 3",
      amount: 1000,
      fees: 60,
      date: new Date('2022-12-06T06:51:55.613Z'),
      income: undefined,
      outcome: undefined,
    };
    //Act
    const result = movementService.createMovement(newMovement);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
  it('should store a payment movement', () => {
    //Arrange
    const newMovement: MovementCreateDto = {
      idIncome: '195f920e-a97c-4f36-aa86-d58d81215343',
      idOutcome: '8ab1554b-7630-480c-90d1-787edb906275',
      reason: "Mateo's consultant services 3",
      amount: 1000,
      fees: 1,
      id: '',
      date: new Date('2022-12-06T06:51:55.613Z'),
    };

    const expected: MovementEntity = {
      id: '8557760e-391e-4cb1-af3d-7df017621331',
      idIncome: '195f920e-a97c-4f36-aa86-d58d81215343',
      idOutcome: '8ab1554b-7630-480c-90d1-787edb906275',
      reason: "Mateo's consultant services 3",
      amount: 1000,
      fees: 1,
      date: new Date('2022-12-06T06:51:55.613Z'),
      income: undefined,
      outcome: undefined,
    };
    //Act
    const result = movementService.createMovement(newMovement);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
