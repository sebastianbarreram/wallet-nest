import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description:
      'The uuid of the movement. This unique identifier is auto-generated if it does not exist in request body.',
  })
  id: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `idIncome` argument must be of type string',
  })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the account who deposit money.',
  })
  idIncome: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `idOutcome` argument must be of type string',
  })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the account who withdrawal money.',
  })
  idOutcome: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `reason` argument must be of type string',
  })
  @ApiProperty({
    example: 'Pay rent',
    description: 'The transfer description.',
  })
  reason: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'The `amount` argument must be of type number' })
  @ApiProperty({
    example: '2000000',
    description: 'The amount of money in transaction.',
  })
  amount: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'The `fees` argument must be of type number' })
  @ApiProperty({
    example: '1',
    description: 'The number of fees in transaction.',
  })
  fees: number;

  @IsOptional()
  @IsDate({
    message: 'The `date` argument must be of type Date',
  })
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description:
      'The exact time the money was moved from one account to another.',
  })
  date: Date;
}
