import { IsNotEmpty, IsOptional } from 'class-validator';
import { MovementInterface } from './interfaces/movement.interface';

export class MovementCreateDto implements MovementInterface {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  idIncome: string;

  @IsNotEmpty()
  idOutcome: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  fees: number;

  @IsOptional()
  date: Date;
}
