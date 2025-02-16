import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Rent from "../rent/rent.entity";
import Base from "../../common/entities/base.entity";

@Entity({ name: "scooter" })
export default class Scooter extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column({ comment: "車牌號碼" })
  license_plate: string;

  @OneToMany(() => Rent, (rent) => rent.id)
  rents: Rent[];
}
