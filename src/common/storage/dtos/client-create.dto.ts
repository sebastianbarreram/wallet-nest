import { AccountEntity } from '../postgres/entities/account.entity';
import { AppEntity } from '../postgres/entities/app.entity';
import { ClientInterface } from './interfaces/client.interface';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ClientCreateDto implements ClientInterface {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `fullName` argument must be of type string',
  })
  fullName: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `email` argument must be of type string',
  })
  email: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `phone` argument must be of type string',
  })
  phone: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `photo` argument must be of type string',
  })
  photo: string;

  @IsOptional()
  @IsNumber({}, { message: 'The `state` argument must be of type number' })
  state: number;

  @IsDate({
    message: 'The `createdAt` argument must be of type Date',
  })
  @IsOptional()
  createdAt: Date;

  @IsDate({
    message: 'The `updatedAt` argument must be of type Date',
  })
  @IsOptional()
  updatedAt: Date | null;

  @IsDate({
    message: 'The `deletedAt` argument must be of type Date',
  })
  @IsOptional()
  deletedAt: Date | null;

  @IsOptional()
  account: AccountEntity;

  @IsOptional()
  app: AppEntity;
}
