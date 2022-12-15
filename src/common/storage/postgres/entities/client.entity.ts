import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ClientCreateDto } from '../../dtos/client-create.dto';
import { AccountEntity } from './account.entity';
import { AppEntity } from './app.entity';

@Index('client_cli_email_Idx', ['email'], { unique: true })
@Index('pkclient', ['id'], { unique: true })
@Index('client_cli_phone_Idx', ['phone'], { unique: true })
@Entity('client', { schema: 'public' })
export class ClientEntity {
  @Column('uuid', { primary: true, name: 'cli_id' })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description:
      'The uuid of the client. This unique identifier is auto-generated if it does not exist in request body.',
  })
  id: string = uuid();

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  @ApiProperty({
    example: 'Sebastian Barrera Marín',
    description: 'The full name of the client.',
  })
  fullName: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  @ApiProperty({
    example: 'sebastian.barrera@sofka.com.co',
    description: 'The email of the client.',
  })
  email: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the client.',
  })
  phone: string;

  @Column('character varying', { name: 'cli_photo', length: 500 })
  @ApiProperty({
    example:
      'https://s.gravatar.com/avatar/21a3061386769465e44ee13e14093a97?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png',
    description: 'The photo of the client.',
  })
  photo: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  @ApiProperty({
    example: 1,
    description: 'The client status.',
  })
  state: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was created.',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was updated.',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the client was deleted.',
  })
  deletedAt: Date | null;

  @OneToOne(() => AccountEntity, (account) => account.client, {
    cascade: ['insert'],
  })
  account: AccountEntity;

  @OneToOne(() => AppEntity, (app) => app.client, { cascade: ['insert'] })
  app: AppEntity;

  constructor(client?: ClientCreateDto) {
    this.fullName = client?.fullName;
    this.email = client?.email;
    this.phone = client?.phone;
    this.photo = client?.photo;
    this.state = client?.state ?? 1;
    this.createdAt = new Date();
    this.updatedAt = null;
    this.account = new AccountEntity();
    this.app = new AppEntity();
  }
}
