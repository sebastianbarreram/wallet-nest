import { ClientEntity } from '../postgres/entities/client.entity';
import { AppInterface } from './interfaces/app.interface';

export class AppUpdateDto implements AppInterface {
  id: string;
  idClient: string;
  color: string;
  createdAt: Date;
  updatedAt: Date | null;
  client: ClientEntity;
}
