import { AccountEntity } from '../postgres/entities/account.entity';
import { AppEntity } from '../postgres/entities/app.entity';
import { MovementInterface } from './interfaces/movement.interface';

export class MovementCreateDto implements MovementInterface {
  id: string;
  idIncome: string;
  idOutcome: string;
  reason: string;
  amount: string;
  fees: string;
  date: Date;
}
