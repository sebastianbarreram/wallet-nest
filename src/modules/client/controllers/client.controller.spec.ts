import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../services/client.service';
import { ClientController } from './client.controller';

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
      controllers: [ClientController],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
