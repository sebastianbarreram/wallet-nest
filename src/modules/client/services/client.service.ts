import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientCreateDto } from 'src/common/storage/dtos/client-create.dto';
import { ClientEntity } from 'src/common/storage/postgres/entities/client.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(private dataSource: DataSource) {}

  async createNewClient(client: ClientEntity): Promise<ClientEntity> {
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
        'Tenemos problemas para insertar una factura',
        HttpStatus.CONFLICT,
      );
    }
  }

  // createNewClient(){}

  getClient() {
    return 'mensaje';
  }

  getClientBySearch(search: string) {}
}
