import { Test, TestingModule } from '@nestjs/testing';
import { MovementController } from './movement.controller';
import { MovementService } from '../services/movement.service';

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
            createMovement: jest.fn().mockImplementation(() => {
              return {};
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
    const newMovement = {
      idIncome: '1',
      idOutcome: '1',
      reason: 'Car wash',
      amount: '10000',
      fees: '60',
    };
    //Act
    const result = controller.createMovement();
    //Assert
    // expect(result).resolves.toEqual(expected);
    // expect(service.updateCredit).toHaveBeenCalled();
    expect(service.createMovement).toHaveBeenCalled();
  });
});
