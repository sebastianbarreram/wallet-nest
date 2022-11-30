import { Client } from '../postgres/entities/client.entity';
import { Movement } from '../postgres/entities/Movement.entity';
export class AccountDto {
  id: string;
  idClient: string;
  balance: string;
  credit: string;
  state: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  client: Client;
  movementsIncome: Movement[];
  movementsOutcome: Movement[];
}
