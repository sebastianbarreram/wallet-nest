import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClientEntity } from '../postgres/entities/client.entity';
import { AppInterface } from './interfaces/app.interface';

export class AppUpdateDto implements AppInterface {
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
    message: 'The `idClient` argument must be of type string',
  })
  @ApiPropertyOptional({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the client.',
  })
  idClient: string;

  @IsNotEmpty()
  @IsString({
    message: 'The `color` argument must be of type string',
  })
  @ApiProperty({
    example: '#1554F7',
    description: 'The color of the app.',
  })
  color: string;

  @IsOptional()
  @IsDate({ message: 'The `createdAt` argument must be of type Date' })
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the app was created.',
  })
  createdAt: Date;

  @IsOptional()
  @IsDate({ message: 'The `createdAt` argument must be of type Date' })
  @ApiPropertyOptional({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the app was updated.',
  })
  updatedAt: Date | null;

  @IsOptional()
  client: ClientEntity;
}
