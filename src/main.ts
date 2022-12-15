import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { PipeValidator } from './common/storage/config/pipe-validator.config';
import { SwaggerModule } from '@nestjs/swagger';
import { configDocumentBuilder } from './common/config/config-document-builder';
import { optionsDocumentBuilder } from './common/config/options-document-builder';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(PipeValidator);
  SwaggerModule.setup(
    'docs/api',
    app,
    SwaggerModule.createDocument(
      app,
      configDocumentBuilder,
      optionsDocumentBuilder,
    ),
  );
  await app.listen(3000);
}
bootstrap();
