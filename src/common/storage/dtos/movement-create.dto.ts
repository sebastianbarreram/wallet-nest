import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MovementInterface } from './interfaces/movement.interface';

export class MovementCreateDto implements MovementInterface {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `idIncome` argument must be of type string',
  })
  idIncome: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `idOutcome` argument must be of type string',
  })
  idOutcome: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `reason` argument must be of type string',
  })
  reason: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'The `amount` argument must be of type number' })
  amount: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'The `fees` argument must be of type number' })
  fees: number;

  @IsOptional()
  @IsDate({
    message: 'The `date` argument must be of type Date',
  })
  date: Date;
}
