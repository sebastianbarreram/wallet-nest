import { Column, Entity, Index, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ClientCreateDto } from '../../dtos/clientCreate.dto';
import { Account } from './account.entity';
import { App } from './App.entity';

// @Index('client_cli_email_Idx', ['email'], { unique: true })
// @Index('pkclient', ['id'], { unique: true })
// @Index('client_cli_phone_Idx', ['phone'], { unique: true })
// @Entity('client', { schema: 'public' })
// export class ClientEntity {
//   @Column('uuid', { primary: true, name: 'cli_id' })
//   id: string = uuid();

//   @Column('character varying', { name: 'cli_full_name', length: 500 })
//   fullName: string;

//   @Column('character varying', { name: 'cli_email', length: 500 })
//   email: string;

//   @Column('character varying', { name: 'cli_phone', length: 500 })
//   phone: string;

//   @Column('character varying', { name: 'cli_photo', length: 500 })
//   photo: string;

//   @Column('integer', { name: 'cli_state', default: () => '1' })
//   state: number;

//   @Column('timestamp without time zone', {
//     name: 'cli_created_at',
//     default: () => 'now()',
//   })
//   createdAt: Date;

//   @Column('timestamp without time zone', {
//     name: 'cli_updated_at',
//     nullable: true,
//   })
//   updatedAt: Date | null;

//   @Column('timestamp without time zone', {
//     name: 'cli_deleted_at',
//     nullable: true,
//   })
//   deletedAt: Date | null;

//   @OneToOne(() => AccountEntity, (account) => account.client)
//   account: AccountEntity;

//   @OneToOne(() => AppEntity, (app) => app.client)
//   app: AppEntity;

//   constructor(client?: ClientCreateDto) {
//     this.fullName = client?.fullName ?? '';
//     this.email = client?.email ?? '';
//     this.phone = client?.phone ?? '';
//     // this.state = client?.state ?? 1;
//     this.createdAt = new Date();
//     this.updatedAt = null;
//     this.account = client?.account;
//     this.app = client?.app;
//   }
// }
@Index('client_cli_email_Idx', ['cliEmail'], { unique: true })
@Index('pkclient', ['cliId'], { unique: true })
@Index('client_cli_phone_Idx', ['cliPhone'], { unique: true })
@Entity('client', { schema: 'public' })
export class Client {
  @Column('uuid', { primary: true, name: 'cli_id' })
  cliId: string = uuid();

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  cliFullName: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  cliEmail: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  cliPhone: string;

  @Column('character varying', { name: 'cli_photo', length: 500 })
  cliPhoto: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  cliState: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  cliCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  cliUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  cliDeletedAt: Date | null;

  @OneToOne(() => Account, (account) => account.cli)
  account: Account;

  @OneToOne(() => App, (app) => app.cli)
  app: App;
}
