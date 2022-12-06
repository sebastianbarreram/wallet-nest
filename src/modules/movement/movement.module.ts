import { Module } from '@nestjs/common';
import { MovementController } from './controllers/movement.controller';
import { MovementService } from './services/movement.service';
import { AccountService } from '../account/services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../common/storage/postgres/entities/account.entity';
import { MovementEntity } from '../../common/storage/postgres/entities/movement.entity';

@Module({
  controllers: [MovementController],
  providers: [MovementService, AccountService],
  imports: [TypeOrmModule.forFeature([AccountEntity, MovementEntity])],
})
export class MovementModule {}
