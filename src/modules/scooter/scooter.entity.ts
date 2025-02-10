import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Rent from "../rent/rent.entity";
import Base from "../../common/entities/base.entity";

@Entity()
export default class Scooter extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @OneToMany(() => Rent, (rent) => rent.id)
  rents: Rent[];
}
