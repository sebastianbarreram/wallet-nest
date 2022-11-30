import { ClientEntity } from '../postgres/entities/client.entity';
export class AppDto {
  id: string;
  idClient: string;
  color: string;
  createdAt: Date;
  updatedAt: Date | null;
  client: ClientEntity;
}
