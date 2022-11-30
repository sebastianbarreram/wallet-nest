import { Module } from '@nestjs/common';
import { AppController } from './modules/main/controllers/app.controller';
import { AppService } from './modules/main/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      // entities: [FacturaEntity, DetalleFacturaEntity],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
