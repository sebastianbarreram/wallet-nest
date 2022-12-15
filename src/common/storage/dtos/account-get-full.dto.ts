import { AccountGetByIDInterface } from './interfaces/account-get-by-id.interface';
import { MovementInterface } from '../dtos/interfaces/movement.interface';
import { AccountEntity } from '../postgres/entities/account.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AccountFullDto {
  @ApiProperty({
    description: 'The account of the client.',
  })
  account: AccountEntity;

  @ApiProperty({
    description: 'The movements of the account.',
  })
  movements: MovementInterface[];

  @ApiProperty({
    description: 'The client images in movements.',
  })
  images: AccountGetByIDInterface[];
}
