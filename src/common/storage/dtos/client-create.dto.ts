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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClientCreateDto implements ClientInterface {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description:
      'The uuid of the client. This unique identifier is auto-generated if it does not exist in request body.',
  })
  id: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `fullName` argument must be of type string',
  })
  @ApiProperty({
    example: 'Sebastian Barrera Marín',
    description: 'The full name of the client.',
  })
  fullName: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `email` argument must be of type string',
  })
  @ApiProperty({
    example: 'sebastian.barrera@sofka.com.co',
    description: 'The email of the client.',
  })
  email: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `phone` argument must be of type string',
  })
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the client.',
  })
  phone: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `photo` argument must be of type string',
  })
  @ApiProperty({
    example:
      'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
    description: 'The photo of the client.',
  })
  photo: string;

  @IsOptional()
  @IsNumber({}, { message: 'The `state` argument must be of type number' })
  @ApiPropertyOptional({
    example: 1,
    description: 'The client status.',
  })
  state: number;

  @IsDate({
    message: 'The `createdAt` argument must be of type Date',
  })
  @IsOptional()
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was created.',
  })
  createdAt: Date;

  @IsDate({
    message: 'The `updatedAt` argument must be of type Date',
  })
  @IsOptional()
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was updated.',
  })
  updatedAt: Date | null;

  @IsDate({
    message: 'The `deletedAt` argument must be of type Date',
  })
  @IsOptional()
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was deleted.',
  })
  deletedAt: Date | null;

  @IsOptional()
  account: AccountEntity;

  @IsOptional()
  app: AppEntity;
}
