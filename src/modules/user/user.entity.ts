import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import Rent from "../rent/rent.entity";
import Base from "../../common/entities/base.entity";

@Entity({ name: "user" })
@Unique(["account"])
export default class User extends Base {
  /**
   * 流水號 id (自動產生)
   */
  @PrimaryGeneratedColumn("increment", {
    type: "integer",
    comment: "流水號 id",
  })
  id!: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ comment: "帳號" })
  account: string;

  @Column({ comment: "密碼" })
  password: string;

  @OneToMany(() => Rent, (rent) => rent.id)
  rents: Rent[];
}
