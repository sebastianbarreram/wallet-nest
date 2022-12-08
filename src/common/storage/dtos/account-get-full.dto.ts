import { AccountGetByIDInterface } from './interfaces/account-get-by-id.interface';
import { MovementInterface } from '../dtos/interfaces/movement.interface';
import { AccountEntity } from '../postgres/entities/account.entity';

export class AccountFullDto {
  account: AccountEntity;
  movements: MovementInterface[];
  images: AccountGetByIDInterface[];
}
