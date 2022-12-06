import { Module } from '@nestjs/common';
import { MainService } from './modules/main/services/main.service';
import { MainController } from './modules/main/controllers/main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { AppModule } from './modules/app/app.module';
import { ClientModule } from './modules/client/client.module';
import { MovementModule } from './modules/movement/movement.module';
import { AccountEntity } from './common/storage/postgres/entities/account.entity';
import { AppEntity } from './common/storage/postgres/entities/app.entity';
import { ClientEntity } from './common/storage/postgres/entities/client.entity';
import { MovementEntity } from './common/storage/postgres/entities/movement.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [AccountEntity, AppEntity, ClientEntity, MovementEntity],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    AppModule,
    ClientModule,
    MovementModule,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
