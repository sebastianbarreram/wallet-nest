import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../services/client.service';
import { ClientController } from './client.controller';
import { ClientEntity } from '../../../common/storage/postgres/entities/client.entity';
import { ClientCreateDto } from '../../../common/storage/dtos/client-create.dto';

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
                return Promise.resolve({
                  id: '875c9f79-6b97-48ec-9bcf-d21b6654ef79',
                  fullName: 'qqqqq',
                  email: 'w1@w.com',
                  phone: '212121212121',
                  photo:
                    'https://lh3.googleusercontent.com/a/ALm5wu2aVo2Geh0uDQ0qO8hVpheL0w9vRbpATJl8YKj6=s96-c',
                  state: 1,
                  createdAt: '2022-12-05T22:48:19.874Z',
                  updatedAt: null,
                  account: {
                    id: '818e854b-4eef-48d1-ba19-ed6dd82dc4bc',
                    idClient: '875c9f79-6b97-48ec-9bcf-d21b6654ef79',
                    updatedAt: null,
                    deletedAt: null,
                    balance: '0',
                    credit: '50000000',
                    state: 1,
                    createdAt: '2022-12-06T03:48:20.523Z',
                  },
                  app: {
                    id: '100eaa57-bbbd-4009-8755-2bbf33c40d25',
                    idClient: '875c9f79-6b97-48ec-9bcf-d21b6654ef79',
                    updatedAt: null,
                    color: 'default',
                    createdAt: '2022-12-06T03:48:20.523Z',
                  },
                  deletedAt: null,
                });
              }),
            getClientBySearch: jest
              .fn()
              .mockImplementation((search: string) => {
                return Promise.resolve({
                  id: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
                  fullName: 'Sebastian Barrera Marin',
                  email: 'sebastian.barrera@sofka.com.co',
                  phone: '3',
                  photo:
                    'https://lh3.googleusercontent.com/a/ALm5wu2aVo2Geh0uDQ0qO8hVpheL0w9vRbpATJl8YKj6=s96-c',
                  state: 1,
                  createdAt: '2022-12-04T18:57:12.752Z',
                  updatedAt: null,
                  account: {
                    id: '975da24c-fbb9-464d-920b-3231bf4378be',
                    idClient: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
                    balance: '0',
                    credit: '50000000',
                    state: 1,
                    createdAt: '2022-12-04T23:57:13.561Z',
                    updatedAt: null,
                    deletedAt: null,
                  },
                  app: {
                    id: 'a7358691-59ca-4431-aab6-52c3eeb4a49d',
                    idClient: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
                    color: 'default',
                    createdAt: '2022-12-04T23:57:13.561Z',
                    updatedAt: null,
                  },
                  deletedAt: null,
                });
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

  it('should store a client', () => {
    //Arrange
    const newClient: ClientCreateDto = {
      fullName: 'qqqqq',
      email: 'w1@w.com',
      phone: '212121212121',
      id: '',
      photo: '',
      state: 0,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
      account: undefined,
      app: undefined,
    };

    const expected = {
      id: '875c9f79-6b97-48ec-9bcf-d21b6654ef79',
      fullName: 'qqqqq',
      email: 'w1@w.com',
      phone: '212121212121',
      photo:
        'https://lh3.googleusercontent.com/a/ALm5wu2aVo2Geh0uDQ0qO8hVpheL0w9vRbpATJl8YKj6=s96-c',
      state: 1,
      createdAt: '2022-12-05T22:48:19.874Z',
      updatedAt: null,
      account: {
        id: '818e854b-4eef-48d1-ba19-ed6dd82dc4bc',
        idClient: '875c9f79-6b97-48ec-9bcf-d21b6654ef79',
        updatedAt: null,
        deletedAt: null,
        balance: '0',
        credit: '50000000',
        state: 1,
        createdAt: '2022-12-06T03:48:20.523Z',
      },
      app: {
        id: '100eaa57-bbbd-4009-8755-2bbf33c40d25',
        idClient: '875c9f79-6b97-48ec-9bcf-d21b6654ef79',
        updatedAt: null,
        color: 'default',
        createdAt: '2022-12-06T03:48:20.523Z',
      },
      deletedAt: null,
    };
    //Act
    const result = controller.signup(newClient);
    //Assert
    expect(service.createNewClient).toHaveBeenCalled();
    expect(result).resolves.toEqual(expected);
  });

  it('should fetch a specific client by its email', () => {
    //Arrange
    const email = 'sebastian.barrera@sofka.com.co';
    const expected = {
      id: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
      fullName: 'Sebastian Barrera Marin',
      email: 'sebastian.barrera@sofka.com.co',
      phone: '3',
      photo:
        'https://lh3.googleusercontent.com/a/ALm5wu2aVo2Geh0uDQ0qO8hVpheL0w9vRbpATJl8YKj6=s96-c',
      state: 1,
      createdAt: '2022-12-04T18:57:12.752Z',
      updatedAt: null,
      account: {
        id: '975da24c-fbb9-464d-920b-3231bf4378be',
        idClient: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
        balance: '0',
        credit: '50000000',
        state: 1,
        createdAt: '2022-12-04T23:57:13.561Z',
        updatedAt: null,
        deletedAt: null,
      },
      app: {
        id: 'a7358691-59ca-4431-aab6-52c3eeb4a49d',
        idClient: 'df1f52c4-39a4-4f1e-b0d8-28b4ff5ec092',
        color: 'default',
        createdAt: '2022-12-04T23:57:13.561Z',
        updatedAt: null,
      },
      deletedAt: null,
    };
    //Act
    const result = controller.getClientBySearch(email);
    //Assert
    expect(service.getClientBySearch).toHaveBeenCalled();
    expect(result).resolves.toEqual(expected);
  });
});
