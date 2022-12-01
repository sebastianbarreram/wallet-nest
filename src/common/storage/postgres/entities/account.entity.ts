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
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  idClient: string;

  @Column('bigint', { name: 'acc_balance', default: () => '0' })
  balance: string;

  @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
  credit: string;

  @Column('integer', { name: 'acc_state', default: () => '1' })
  state: number;

  @Column('timestamp without time zone', {
    name: 'acc_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'acc_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'acc_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.account, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  client: ClientEntity;

  @OneToMany(() => MovementEntity, (movement) => movement.income)
  movementsIncome: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement) => movement.outcome)
  movementsOutcome: MovementEntity[];

  constructor(account?: AccountDto) {
    if (account?.balance) this.balance = account.balance;
    if (account?.credit) this.credit = account.credit;
    if (account?.state) this.state = account.state;
    if (account?.createdAt) this.createdAt = account.createdAt;
    if (account?.updatedAt) this.updatedAt = account.updatedAt;
    if (account?.deletedAt) this.deletedAt = account.deletedAt;
    // this.movementsIncome = [];
    // this.movementsOutcome = [];
  }
}
// @Index('pkaccount', ['accId'], { unique: true })
// @Index('account_cli_id_Idx', ['cliId'], { unique: true })
// @Entity('account', { schema: 'public' })
// export class Account {
//   @Column('uuid', { primary: true, name: 'acc_id' })
//   accId: string = uuid();

//   @Column('uuid', { name: 'cli_id' })
//   cliId: string;

//   @Column('bigint', { name: 'acc_balance', default: () => '0' })
//   accBalance: string;

//   @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
//   accCredit: string;

//   @Column('integer', { name: 'acc_state', default: () => '1' })
//   accState: number;

//   @Column('timestamp without time zone', {
//     name: 'acc_created_at',
//     default: () => 'now()',
//   })
//   accCreatedAt: Date;

//   @Column('timestamp without time zone', {
//     name: 'acc_updated_at',
//     nullable: true,
//   })
//   accUpdatedAt: Date | null;

//   @Column('timestamp without time zone', {
//     name: 'acc_deleted_at',
//     nullable: true,
//   })
//   accDeletedAt: Date | null;

//   @OneToOne(() => Client, (client) => client.account, {
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT',
//   })
//   @JoinColumn([{ name: 'cli_id', referencedColumnName: 'cliId' }])
//   cli: Client;

//   @OneToMany(() => Movement, (movement) => movement.accIdIncome2)
//   movements: Movement[];

//   @OneToMany(() => Movement, (movement) => movement.accIdOutcome2)
//   movements2: Movement[];
// }
