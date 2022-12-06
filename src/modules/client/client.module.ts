import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../common/storage/postgres/entities/client.entity';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [TypeOrmModule.forFeature([ClientEntity])],
})
export class ClientModule {}
