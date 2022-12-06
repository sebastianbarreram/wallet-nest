import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { AppEntity } from '../../common/storage/postgres/entities/app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [TypeOrmModule.forFeature([AppEntity])],
})
export class AppModule {}
