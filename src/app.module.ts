import { Module } from '@nestjs/common';
import { AppController } from './modules/main/controllers/app.controller';
import { AppService } from './modules/main/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { ClientModule } from './modules/client/client.module';
import { MovementModule } from './modules/movement/movement.module';
// import { AccountEntity, Account } from './common/storage/postgres/entities/account.entity';
// import { AppEntity } from './common/storage/postgres/entities/app.entity';
// import { MovementEntity, Movement } from './common/storage/postgres/entities/movement.entity';
// import { ClientEntity } from './common/storage/postgres/entities/client.entity';
import { Account } from './common/storage/postgres/entities/account.entity';
import { App } from './common/storage/postgres/entities/App.entity';
import { Client } from './common/storage/postgres/entities/client.entity';
import { Movement } from './common/storage/postgres/entities/Movement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      // entities: [AccountEntity, AppEntity, ClientEntity, MovementEntity],
      entities: [Account, App, Client, Movement],
      synchronize: false,
    }),
    AccountModule,
    AppModule,
    ClientModule,
    MovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
