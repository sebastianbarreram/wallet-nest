import { Test, TestingModule } from '@nestjs/testing';
import { MovementService } from './movement.service';
import { MovementEntity } from '../../../common/storage/postgres/entities/movement.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';

describe('MovementService', () => {
  let service: MovementService;
  let repository: Repository<MovementEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementService,
        {
          provide: getRepositoryToken(MovementEntity),
          useValue: {
            save: jest.fn().mockResolvedValue({
              id: '8557760e-391e-4cb1-af3d-7df017621331',
              idIncome: '772d6de5-3d40-4927-b28b-99fa5b1d4617',
              idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
              reason: "Mateo's consultant services 3",
              amount: 1000,
              fees: 1,
              date: '2022-12-06T06:51:55.613Z',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MovementService>(MovementService);
    repository = module.get<Repository<MovementEntity>>(
      getRepositoryToken(MovementEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should store a movement', () => {
    //Arrange
    const newMovement: MovementCreateDto = {
      idIncome: '772d6de5-3d40-4927-b28b-99fa5b1d4617',
      idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
      reason: "Mateo's consultant services 3",
      amount: 1000,
      fees: 1,
      id: '',
      date: undefined,
    };

    const expected = {
      id: '8557760e-391e-4cb1-af3d-7df017621331',
      idIncome: '772d6de5-3d40-4927-b28b-99fa5b1d4617',
      idOutcome: '648ab7d1-bd49-4cfa-8a84-322449cae19d',
      reason: "Mateo's consultant services 3",
      amount: 1000,
      fees: 1,
      date: '2022-12-06T06:51:55.613Z',
    };
    //Act
    const result = service.createMovement(newMovement);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
