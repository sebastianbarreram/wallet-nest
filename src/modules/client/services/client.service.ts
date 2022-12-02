import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientCreateDto } from '../../../common/storage/dtos/client-create.dto';
import { ClientEntity } from 'src/common/storage/postgres/entities/client.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(private dataSource: DataSource) {}

  async createNewClient(clientInput: ClientCreateDto): Promise<ClientEntity> {
    const client = new ClientEntity(clientInput);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log(client);

    try {
      const newClient = await queryRunner.manager.save(client);
      await queryRunner.commitTransaction();
      return Promise.resolve(newClient);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err);

      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para insertar un cliente',
        HttpStatus.CONFLICT,
      );
    }
  }

  // getClient() {
  //   return 'mensaje';
  // }

  async getClientBySearch(search: string): Promise<ClientEntity> {
    const validEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (validEmail.test(search)) {
      const client = await this.dataSource.getRepository(ClientEntity).findOne({
        where: {
          email: search,
        },
        relations: {
          account: false,
          app: false,
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
