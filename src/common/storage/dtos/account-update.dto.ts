import { IsOptional } from 'class-validator';
import { ClientEntity } from '../postgres/entities/client.entity';
import { MovementEntity } from '../postgres/entities/movement.entity';
import { AccountInterface } from './interfaces/account.interface';
export class AccountUpdateDto implements AccountInterface {
  @IsOptional()
  id: string;

  @IsOptional()
  idClient: string;

  @IsOptional()
  balance: string;

  @IsOptional()
  credit: string;

  @IsOptional()
  state: number;

  @IsOptional()
  createdAt: Date | null;

  @IsOptional()
  updatedAt: Date | null;

  @IsOptional()
  deletedAt: Date | null;

  @IsOptional()
  client: ClientEntity;

  @IsOptional()
  movementsIncome: MovementEntity[];

  @IsOptional()
  movementsOutcome: MovementEntity[];
}
