import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { ClientEntity } from "./Client.entity";
import { MovementEntity } from "./Movement.entity";

@Index("pkaccount", ["accId"], { unique: true })
@Index("account_cli_id_Idx", ["cliId"], { unique: true })
@Entity("account", { schema: "public" })
export class AccountEntity {
  @Column("uuid", { primary: true, name: "acc_id" })
  id: string;

  @Column("uuid", { name: "cli_id" })
  idClient: string;

  @Column("bigint", { name: "acc_balance", default: () => "0" })
  balance: string;

  @Column("bigint", { name: "acc_credit", default: () => "50000000" })
  credit: string;

  @Column("integer", { name: "acc_state", default: () => "1" })
  state: number;

  @Column("timestamp without time zone", {
    name: "acc_created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "acc_updated_at",
    nullable: true,
  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", {
    name: "acc_deleted_at",
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.account, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "cli_id", referencedColumnName: "cliId" }])
  client: ClientEntity;

  @OneToMany(() => MovementEntity, (movement) => movement.accIdIncome2)
  movements: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement) => movement.accIdOutcome2)
  movements2: MovementEntity[];
}
