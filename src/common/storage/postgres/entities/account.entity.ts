import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AccountDto } from '../../dtos/account.dto';
import { ClientEntity } from './client.entity';
import { MovementEntity } from './movement.entity';

@Index('pkaccount', ['id'], { unique: true })
@Index('account_cli_id_Idx', ['idClient'], { unique: true })
@Entity('account', { schema: 'public' })
export class AccountEntity {
  @Column('uuid', { primary: true, name: 'acc_id' })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description:
      'The uuid of the app. This unique identifier is auto-generated if it does not exist in request body.',
  })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the client.',
  })
  idClient: string;

  @Column('bigint', { name: 'acc_balance', default: () => '0' })
  @ApiProperty({
    example: '2000000',
    description: 'The amount of money present in account.',
  })
  balance: string;

  @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
  @ApiProperty({
    example: '2000000',
    description: 'The amount of money available for loan.',
  })
  credit: string;

  @Column('integer', { name: 'acc_state', default: () => '1' })
  @ApiProperty({
    example: 1,
    description: 'The account status.',
  })
  state: number;

  @Column('timestamp without time zone', {
    name: 'acc_created_at',
    default: () => 'now()',
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the account was created.',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'acc_updated_at',
    nullable: true,
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the account was updated.',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'acc_deleted_at',
    nullable: true,
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the account was deleted.',
  })
  deletedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.account, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  client: ClientEntity;

  @OneToMany(() => MovementEntity, (movement) => movement.income, {
    cascade: ['update'],
  })
  @ApiProperty({
    example:
      '[{"amount": "50000", "date": "2022-12-15T18:57:56.998Z", "fees": 1, "id": "849dd03d-7bc1-417d-854e-98c8e66d917b", "idIncome": "4930c3e9-1c49-45a4-8439-b2d574c106e5", "idOutcome": "27acf227-382d-406f-841a-824f68739103", "reason": "Transport"}]',
    description: 'The transfers with deposit of money in the account.',
  })
  movementsIncome: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement) => movement.outcome, {
    cascade: ['update'],
  })
  @ApiProperty({
    example:
      '[{"amount": "50000", "date": "2022-12-15T18:57:56.998Z", "fees": 1, "id": "849dd03d-7bc1-417d-854e-98c8e66d917b", "idIncome": "4930c3e9-1c49-45a4-8439-b2d574c106e5", "idOutcome": "27acf227-382d-406f-841a-824f68739103", "reason": "Transport"}]',
    description: 'The transfers with withdrawal of money from the account.',
  })
  movementsOutcome: MovementEntity[];

  constructor(account?: AccountDto) {
    if (account?.id) this.id = account.id;
    if (account?.balance) this.balance = account.balance;
    if (account?.credit) this.credit = account.credit;
    if (account?.state) this.state = account.state;
    if (account?.createdAt) this.createdAt = account.createdAt;
    if (account?.updatedAt) this.updatedAt = account.updatedAt;
    if (account?.deletedAt) this.deletedAt = account.deletedAt;
  }
}
