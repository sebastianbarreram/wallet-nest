import { AccountEntity } from '../postgres/entities/account.entity';
import { AppEntity } from '../postgres/entities/app.entity';
import { ClientEntity } from '../postgres/entities/client.entity';
import { ClientInterface } from './interfaces/client.interface';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ClientGetDto implements ClientInterface {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  photo: string;

  state: number;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;

  account: AccountEntity;

  app: AppEntity;

  constructor(client?: ClientEntity) {
    this.id = client?.id;
    this.fullName = client?.fullName;
    this.email = client?.email;
    this.phone = client?.phone;
    this.photo = client?.photo;
    this.state = client?.state;
    this.createdAt = client?.createdAt;
    this.updatedAt = client?.updatedAt;
  }
}
