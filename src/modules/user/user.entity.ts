import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Rent from "../rent/rent.entity";
import Base from "../../common/entities/base.entity";

@Entity()
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

  @Column()
  password: string;

  @Column()
  password2: string;

  @OneToMany(() => Rent, (rent) => rent.id)
  rents: Rent[];
}
