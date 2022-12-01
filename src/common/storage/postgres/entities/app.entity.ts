import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ClientEntity } from './client.entity';
import { v4 as uuid } from 'uuid';
import { AppDto } from '../../dtos/app.dto';

@Index('pkapp', ['id'], { unique: true })
@Index('app_cli_id_Idx', ['idClient'], { unique: true })
@Entity('app', { schema: 'public' })
export class AppEntity {
  @Column('uuid', { primary: true, name: 'app_id' })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  idClient: string;

  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'default'",
  })
  color: string;

  @Column('timestamp without time zone', {
    name: 'app_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'app_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.app, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  client: ClientEntity;
  constructor(app?: AppDto) {
    if (app?.color) this.color = app?.color;
  }
}
// @Index('pkapp', ['appId'], { unique: true })
// @Index('app_cli_id_Idx', ['cliId'], { unique: true })
// @Entity('app', { schema: 'public' })
// export class App {
//   @Column('uuid', { primary: true, name: 'app_id' })
//   appId: string = uuid();

//   @Column('uuid', { name: 'cli_id' })
//   cliId: string;

//   @Column('character varying', {
//     name: 'app_color',
//     length: 30,
//     default: () => "'default'",
//   })
//   appColor: string;

//   @Column('timestamp without time zone', {
//     name: 'app_created_at',
//     default: () => 'now()',
//   })
//   appCreatedAt: Date;

//   @Column('timestamp without time zone', {
//     name: 'app_updated_at',
//     nullable: true,
//   })
//   appUpdatedAt: Date | null;

//   @OneToOne(() => Client, (client) => client.app, {
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT',
//   })
//   @JoinColumn([{ name: 'cli_id', referencedColumnName: 'cliId' }])
//   cli: Client;
// }
