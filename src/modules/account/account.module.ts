import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../common/storage/postgres/entities/account.entity';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  exports: [AccountService],
})
export class AccountModule {}
