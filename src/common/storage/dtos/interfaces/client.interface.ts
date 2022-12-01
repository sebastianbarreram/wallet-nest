import { AccountEntity } from '../../postgres/entities/account.entity';
import { AppEntity } from '../../postgres/entities/app.entity';

export interface ClientInterface {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  photo: string;

  state: number;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;

  account: AccountEntity;

  app: AppEntity;
}
