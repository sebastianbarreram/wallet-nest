import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';
import { MovementCreateDto } from '../../dtos/movement-create.dto';

@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['idIncome', 'idOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class MovementEntity {
  @Column('uuid', { primary: true, name: 'mov_id' })
  id: string = uuid();

  @Column('uuid', { name: 'acc_id_income' })
  idIncome: string;

  @Column('uuid', { name: 'acc_id_outcome' })
  idOutcome: string;

  @Column('character varying', { name: 'mov_reason', length: 500 })
  reason: string;

  @Column('bigint', { name: 'mov_amount' })
  amount: string;

  @Column('integer', { name: 'mov_fees', default: () => '1' })
  fees: number;

  @Column('timestamp without time zone', {
    name: 'mov_datetime',
    default: () => 'now()',
  })
  date: Date;

  @ManyToOne(() => AccountEntity, (account) => account.movementsIncome, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_income', referencedColumnName: 'id' }])
  income: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.movementsOutcome, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_outcome', referencedColumnName: 'id' }])
  outcome: AccountEntity;

  constructor(movement?: MovementCreateDto) {
    this.idIncome = movement?.idIncome;
    this.idOutcome = movement?.idOutcome;
    this.reason = movement?.reason;
    this.amount = movement?.amount;
    this.fees = movement?.fees;
  }
}

// @Index(
//   'movement_acc_id_income_acc_id_outcome_Idx',
//   ['accIdIncome', 'accIdOutcome'],
//   {},
// )
// @Index('pkmovement', ['movId'], { unique: true })
// @Entity('movement', { schema: 'public' })
// export class Movement {
//   @Column('uuid', { primary: true, name: 'mov_id' })
//   movId: string = uuid();

//   @Column('uuid', { name: 'acc_id_income' })
//   accIdIncome: string;

//   @Column('uuid', { name: 'acc_id_outcome' })
//   accIdOutcome: string;

//   @Column('character varying', { name: 'mov_reason', length: 500 })
//   movReason: string;

//   @Column('bigint', { name: 'mov_amount' })
//   movAmount: string;

//   @Column('integer', { name: 'mov_fees', default: () => '1' })
//   movFees: number;

//   @Column('timestamp without time zone', {
//     name: 'mov_datetime',
//     default: () => 'now()',
//   })
//   movDatetime: Date;

//   @ManyToOne(() => Account, (account) => account.movements, {
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT',
//   })
//   @JoinColumn([{ name: 'acc_id_income', referencedColumnName: 'accId' }])
//   accIdIncome2: Account;

//   @ManyToOne(() => Account, (account) => account.movements2, {
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT',
//   })
//   @JoinColumn([{ name: 'acc_id_outcome', referencedColumnName: 'accId' }])
//   accIdOutcome2: Account;
// }
