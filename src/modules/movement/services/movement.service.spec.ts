import { Test, TestingModule } from '@nestjs/testing';
import { MovementService } from './movement.service';

describe('MovementService', () => {
  let service: MovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementService],
    }).compile();

    service = module.get<MovementService>(MovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store an income movement from a loan', () => {
    //Arrange
    const newMovement = {
      idIncome: '1',
      idOutcome: '1',
      reason: 'Car wash',
      amount: '10000',
      fees: '60',
    };

    const expected = {
      id: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
      idIncome: '1',
      idOutcome: '1',
      reason: 'Car wash',
      amount: '10000',
      fees: '60',
      date: '2022-12-01T21:29:01.414Z',
    };
    //Act
    const result = service.createMovement(newMovement);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should store an pay movement from a client 2 to client 1', () => {
    //Arrange
    const newMovement = {
      idIncome: '1',
      idOutcome: '2',
      reason: 'Invoice 20129212',
      amount: '200500',
      fees: '1',
    };

    const expected = {
      id: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
      idIncome: '1',
      idOutcome: '2',
      reason: 'Invoice 20129212',
      amount: '200500',
      fees: '1',
      date: '2022-12-01T21:29:01.414Z',
    };
    //Act
    const result = service.createMovement(newMovement);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
