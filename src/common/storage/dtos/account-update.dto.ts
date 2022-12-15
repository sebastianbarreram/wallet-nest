import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ClientEntity } from '../postgres/entities/client.entity';
import { MovementEntity } from '../postgres/entities/movement.entity';
import { AccountInterface } from './interfaces/account.interface';
export class AccountUpdateDto implements AccountInterface {
  @IsOptional()
  @IsString({
    message: 'The `id` argument must be of type string',
  })
  @ApiPropertyOptional({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the app.',
  })
  id: string;

  @IsOptional()
  @IsString({
    message: 'The `photo` argument must be of type string',
  })
  @ApiPropertyOptional({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the client.',
  })
  idClient: string;

  @IsOptional()
  @IsString({
    message: 'The `balance` argument must be of type string',
  })
  @ApiPropertyOptional({
    example: '2000000',
    description: 'The amount of money present in account.',
  })
  balance: string;

  @IsOptional()
  @IsString({
    message: 'The `credit` argument must be of type string',
  })
  @ApiPropertyOptional({
    example: '2000000',
    description: 'The amount of money available for loan.',
  })
  credit: string;

  @IsOptional()
  @IsNumber({}, { message: 'The `state` argument must be of type number' })
  @ApiPropertyOptional({
    example: 1,
    description: 'The account status.',
  })
  state: number;

  @IsOptional()
  @IsDate({
    message: 'The `createdAt` argument must be of type Date',
  })
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the account was created.',
  })
  createdAt: Date | null;

  @IsOptional()
  @IsDate({
    message: 'The `updatedAt` argument must be of type Date',
  })
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the account was updated.',
  })
  updatedAt: Date | null;

  @IsOptional()
  @IsDate({
    message: 'The `deletedAt` argument must be of type Date',
  })
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the account was deleted.',
  })
  deletedAt: Date | null;

  @IsOptional()
  client: ClientEntity;

  @IsOptional()
  movementsIncome: MovementEntity[];

  @IsOptional()
  movementsOutcome: MovementEntity[];
  constructor(data?: AccountInterface) {
    this.balance = data?.balance;
    this.credit = data?.balance;
  }
}
