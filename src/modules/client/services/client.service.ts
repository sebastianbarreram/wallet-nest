import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientCreateDto } from '../../../common/storage/dtos/client-create.dto';
import { ClientEntity } from '../../../common/storage/postgres/entities/client.entity';
import { DataSource, Repository } from 'typeorm';
import { ClientGetDto } from '../../../common/storage/dtos/client-get.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async createNewClient(clientInput: ClientCreateDto): Promise<ClientEntity> {
    const client = new ClientEntity(clientInput);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newClient = await queryRunner.manager.save(client);
      await queryRunner.commitTransaction();
      return Promise.resolve(newClient);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para insertar un cliente',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getClientBySearch(search: string): Promise<ClientGetDto> {
    const validEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (validEmail.test(search)) {
      const client = await this.clientRepository.findOne({
        where: {
          email: search,
        },
        relations: {
          account: true,
          app: true,
        },
      });
      if (client === null || client === undefined) {
        throw new HttpException(
          `Client with email ${search} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return Promise.resolve(client);
    }
    const client = await this.dataSource.getRepository(ClientEntity).findOne({
      where: {
        phone: search,
      },
      relations: {
        account: true,
        app: true,
      },
    });
    if (client === null || client === undefined) {
      throw new HttpException(
        `Client with phone ${search} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return Promise.resolve(client);
  }
}
