import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { ClientEntity } from "./Client.entity";

@Index("token_cli_id_Idx", ["cliId"], {})
@Index("pktoken", ["tokId"], { unique: true })
@Entity("token", { schema: "public" })
export class TokenEntity {
  @Column("uuid", { primary: true, name: "tok_id" })
  id: string;

  @Column("uuid", { name: "cli_id" })
  idClient: string;

  @Column("character varying", { name: "tok_token", length: 500 })
  token: string;

  @Column("timestamp without time zone", { name: "tok_fecha_expiracion" })
  tokenExpirationDate: Date;

  @ManyToOne(() => ClientEntity, (client) => client.tokens, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "cli_id", referencedColumnName: "cliId" }])
  client: ClientEntity;
}
