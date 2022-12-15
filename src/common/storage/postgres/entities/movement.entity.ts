import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';
import { MovementCreateDto } from '../../dtos/movement-create.dto';
import { ApiProperty } from '@nestjs/swagger';

@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['idIncome', 'idOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class MovementEntity {
  @Column('uuid', { primary: true, name: 'mov_id' })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description:
      'The uuid of the movement. This unique identifier is auto-generated if it does not exist in request body.',
  })
  id: string = uuid();

  @Column('uuid', { name: 'acc_id_income' })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the account who deposit money.',
  })
  idIncome: string;

  @Column('uuid', { name: 'acc_id_outcome' })
  @ApiProperty({
    example: 'b8032842-5ecb-43fa-8da4-28b76395fae7',
    description: 'The uuid of the account who withdrawal money.',
  })
  idOutcome: string;

  @Column('character varying', { name: 'mov_reason', length: 500 })
  @ApiProperty({
    example: 'Pay rent',
    description: 'The transfer description.',
  })
  reason: string;

  @Column('bigint', { name: 'mov_amount' })
  @ApiProperty({
    example: '2000000',
    description: 'The amount of money in transaction.',
  })
  amount: number;

  @Column('integer', { name: 'mov_fees', default: () => '1' })
  @ApiProperty({
    example: '1',
    description: 'The number of fees in transaction.',
  })
  fees: number;

  @Column('timestamp without time zone', {
    name: 'mov_datetime',
    default: () => 'now()',
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description:
      'The exact time the money was moved from one account to another.',
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
