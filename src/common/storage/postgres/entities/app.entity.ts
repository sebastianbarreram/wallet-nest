import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ClientEntity } from './client.entity';
import { v4 as uuid } from 'uuid';
import { AppInterface } from '../../dtos/interfaces/app.interface';
import { ApiProperty } from '@nestjs/swagger';

@Index('pkapp', ['id'], { unique: true })
@Index('app_cli_id_Idx', ['idClient'], { unique: true })
@Entity('app', { schema: 'public' })
export class AppEntity {
  @Column('uuid', { primary: true, name: 'app_id' })
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

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'default'",
  })
  @ApiProperty({
    example: '#1554F7',
    description: 'The color of the app.',
  })
  color: string = '#1554F7';

  @Column('timestamp without time zone', {
    name: 'app_created_at',
    default: () => 'now()',
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the app was created.',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'app_updated_at',
    nullable: true,
  })
  @ApiProperty({
    example: '2022-12-14 11:00:01.650000',
    description: 'The exact time the app was updated.',
  })
  updatedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.app, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  client: ClientEntity;
  constructor(app?: AppInterface) {
    if (app?.color) this.color = app?.color;
  }
}
