import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { PipeValidator } from './common/storage/config/pipe-validator.config';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(PipeValidator);
  await app.listen(3000);
}
bootstrap();
