import { Module } from '@nestjs/common';
import { AppController } from './modules/app/controllers/app.controller';
import { AppService } from './modules/app/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { ClientModule } from './modules/client/client.module';
import { MovementModule } from './modules/movement/movement.module';
import { AccountEntity } from './common/storage/postgres/entities/account.entity';
import { AppEntity } from './common/storage/postgres/entities/app.entity';
import { ClientEntity } from './common/storage/postgres/entities/client.entity';
import { MovementEntity } from './common/storage/postgres/entities/movement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      entities: [AccountEntity, AppEntity, ClientEntity, MovementEntity],
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
