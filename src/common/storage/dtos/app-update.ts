import { ClientEntity } from '../postgres/entities/client.entity';

export class AppUpdateDto {
  id?: string;
  idClient?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  client?: ClientEntity;
}
