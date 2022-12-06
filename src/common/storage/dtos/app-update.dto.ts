import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ClientEntity } from '../postgres/entities/client.entity';
import { AppInterface } from './interfaces/app.interface';

export class AppUpdateDto implements AppInterface {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  idClient: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @IsOptional()
  client: ClientEntity;
}
