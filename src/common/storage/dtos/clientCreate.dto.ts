import { Account } from '../postgres/entities/account.entity';
import { App } from '../postgres/entities/App.entity';

export class ClientCreateDto {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  photo: string;

  state: number;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;

  account: Account;

  app: App;
}
