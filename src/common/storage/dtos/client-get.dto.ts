import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '../postgres/entities/account.entity';
import { AppEntity } from '../postgres/entities/app.entity';
import { ClientEntity } from '../postgres/entities/client.entity';
import { ClientInterface } from './interfaces/client.interface';

export class ClientGetDto implements ClientInterface {
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the client.',
  })
  id: string;

  @ApiProperty({
    example: 'Sebastian Barrera Marín',
    description: 'The full name of the client.',
  })
  fullName: string;

  @ApiProperty({
    example: 'sebastian.barrera@sofka.com.co',
    description: 'The email of the client.',
  })
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the client.',
  })
  phone: string;

  @ApiProperty({
    example:
      'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
    description: 'The photo of the client.',
  })
  photo: string;

  @ApiProperty({
    example: 1,
    description: 'The client status.',
  })
  state: number;

  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was updated.',
  })
  updatedAt: Date | null;

  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was deleted.',
  })
  deletedAt: Date | null;

  @ApiProperty({
    description: 'The account of the client.',
  })
  account: AccountEntity;

  @ApiProperty({
    description: 'The application data of the client.',
  })
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
