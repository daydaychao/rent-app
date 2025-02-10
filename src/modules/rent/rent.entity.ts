import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "../user/user.entity";
import Scooter from "../scooter/scooter.entity";
import Base from "../../common/entities/base.entity";

@Entity()
export default class Rent extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Scooter, (scooter) => scooter.id)
  scooter: Scooter;
}
