import { SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppEntity } from '../storage/postgres/entities/app.entity';
import { AccountEntity } from '../storage/postgres/entities/account.entity';
import { ClientEntity } from '../storage/postgres/entities/client.entity';
import { MovementEntity } from '../storage/postgres/entities/movement.entity';

export const optionsDocumentBuilder: SwaggerDocumentOptions = {
  extraModels: [AppEntity, AccountEntity, ClientEntity, MovementEntity],
};
