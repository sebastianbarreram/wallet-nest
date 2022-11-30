import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { AccountEntity } from "./Account.entity";
import { AppEntity } from "./App.entity";
import { TokenEntity } from "./Token.entity";

@Index("client_cli_email_Idx", ["cliEmail"], { unique: true })
@Index("pkclient", ["cliId"], { unique: true })
@Index("client_cli_phone_Idx", ["cliPhone"], { unique: true })
@Entity("client", { schema: "public" })
export class ClientEntity {
  @Column("uuid", { primary: true, name: "cli_id" })
  id: string;

  @Column("character varying", { name: "cli_full_name", length: 500 })
  fullName: string;

  @Column("character varying", { name: "cli_email", length: 500 })
  email: string;

  @Column("character varying", { name: "cli_phone", length: 500 })
  phone: string;

  @Column("character varying", { name: "cli_photo", length: 500 })
  photo: string;

  @Column("integer", { name: "cli_state", default: () => "1" })
  state: number;

  @Column("timestamp without time zone", {
    name: "cli_created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "cli_updated_at",
    nullable: true,
  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", {
    name: "cli_deleted_at",
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(() => AccountEntity, (account) => account.cli)
  account: AccountEntity;

  @OneToOne(() => AppEntity, (app) => app.cli)
  app: AppEntity;

  @OneToMany(() => TokenEntity, (token) => token.cli)
  tokens: TokenEntity[];
}
