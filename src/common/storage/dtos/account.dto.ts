import { ClientEntity } from '../postgres/entities/client.entity';
import { MovementEntity } from '../postgres/entities/movement.entity';
import { AccountInterface } from './interfaces/account.interface';
export class AccountDto implements AccountInterface {
  id: string;
  idClient: string;
  balance: string;
  credit: string;
  state: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  client: ClientEntity;
  movementsIncome: MovementEntity[];
  movementsOutcome: MovementEntity[];
}
