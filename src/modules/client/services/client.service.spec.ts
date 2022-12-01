import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store a client', () => {
    //Arrange
    const newClient = {
      fullName: 'fdsfsd',
      email: 'mns13@m.com',
      phone: '1121',
    };

    const expected = {
      id: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
      photo: '',
      state: 1,
      createdAt: '2022-12-01T16:29:01.391Z',
      updatedAt: null,
      account: {
        id: 'b36a554b-6948-42b6-a177-56fee24814fb',
        idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
        updatedAt: null,
        deletedAt: null,
        balance: '0',
        credit: '50000000',
        state: 1,
        createdAt: '2022-12-01T21:29:01.414Z',
      },
      app: {
        id: 'fa11307e-768f-4e33-9836-ef11a76aa70e',
        idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
        updatedAt: null,
        color: 'default',
        createdAt: '2022-12-01T21:29:01.414Z',
      },
      deletedAt: null,

      ...newClient,
    };
    //Act
    const result = service.createNewClient(newClient);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should fetch a specific client by its email or phone number', () => {
    //Arrange
    const email = 's@s.com';

    const expected = {
      id: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
      fullName: 'fdsfsd',
      email: 's@s.com',
      phone: '11221',
      photo: '',
      state: 1,
      createdAt: '2022-12-01T16:29:01.391Z',
      updatedAt: null,
      account: {
        id: 'b36a554b-6948-42b6-a177-56fee24814fb',
        idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
        updatedAt: null,
        deletedAt: null,
        balance: '0',
        credit: '50000000',
        state: 1,
        createdAt: '2022-12-01T21:29:01.414Z',
      },
      app: {
        id: 'fa11307e-768f-4e33-9836-ef11a76aa70e',
        idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
        updatedAt: null,
        color: 'default',
        createdAt: '2022-12-01T21:29:01.414Z',
      },
      deletedAt: null,
    };
    //Act
    const result = service.getClientBySearch(email);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should fetch a specific client by its phone number', () => {
    //Arrange
    const phone = '11221';

    const expected = {
      id: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
      fullName: 'fdsfsd',
      email: 's@s.com',
      phone: '11221',
      photo: '',
      state: 1,
      createdAt: '2022-12-01T16:29:01.391Z',
      updatedAt: null,
      account: {
        id: 'b36a554b-6948-42b6-a177-56fee24814fb',
        idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
        updatedAt: null,
        deletedAt: null,
        balance: '0',
        credit: '50000000',
        state: 1,
        createdAt: '2022-12-01T21:29:01.414Z',
      },
      app: {
        id: 'fa11307e-768f-4e33-9836-ef11a76aa70e',
        idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
        updatedAt: null,
        color: 'default',
        createdAt: '2022-12-01T21:29:01.414Z',
      },
      deletedAt: null,
    };
    //Act
    const result = service.getClientBySearch(phone);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
