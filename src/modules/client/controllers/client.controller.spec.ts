import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../services/client.service';
import { ClientController } from './client.controller';
import { ClientEntity } from '../../../common/storage/postgres/entities/client.entity';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            createNewClient: jest
              .fn()
              .mockImplementation((client: ClientEntity) => {
                return {};
              }),
            getClientBySearch: jest
              .fn()
              .mockImplementation((search: string) => {
                return {};
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service method createNewClient ', () => {
    //Arrange
    const idClient = 'f03c4464-2aea-4330-a9fb-eda42fb5c724';
    const newClient = {
      fullName: 'fdsfsd',
      email: 'mns13@m.com',
      phone: '1121',
    };
    //Act
    const result = controller.signup(new ClientEntity());
    //Assert
    // expect(result).resolves.toEqual(expected);
    // expect(service.updateCredit).toHaveBeenCalled();
    expect(service.createNewClient).toHaveBeenCalled();
  });

  it('should call the service method getClientBySearch ', () => {
    //Arrange
    const email = 's@s.com';
    const newClient = {
      fullName: 'fdsfsd',
      email: 'mns13@m.com',
      phone: '1121',
    };
    //Act
    const result = controller.getClientBySearch(email);
    //Assert
    // expect(result).resolves.toEqual(expected);
    // expect(service.updateCredit).toHaveBeenCalled();
    expect(service.getClientBySearch).toHaveBeenCalled();
  });
});
