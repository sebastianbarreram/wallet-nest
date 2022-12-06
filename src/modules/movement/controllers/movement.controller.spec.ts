import { Test, TestingModule } from '@nestjs/testing';
import { MovementController } from './movement.controller';
import { MovementService } from '../services/movement.service';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';

describe('MovementController', () => {
  let controller: MovementController;
  let service: MovementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementController],
      providers: [
        {
          provide: MovementService,
          useValue: {
            createMovement: jest.fn().mockResolvedValue({
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

    controller = module.get<MovementController>(MovementController);
    service = module.get<MovementService>(MovementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service method createMovement ', () => {
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
    const result = controller.createMovement(newMovement);
    //Assert
    expect(service.createMovement).toHaveBeenCalled();
    expect(result).resolves.toEqual(expected);
  });
});
