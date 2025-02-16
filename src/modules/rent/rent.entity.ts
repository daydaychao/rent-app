import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from "typeorm";
import User from "../user/user.entity";
import Scooter from "../scooter/scooter.entity";
import Base from "../../common/entities/base.entity";

@Entity({ name: "rent" })
export default class Rent extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("timestamp", { nullable: false, comment: "開始租借時間" })
  start_time!: Date;

  @Column("timestamp", { nullable: true, comment: "結束租借時間" })
  @Index() // 加上索引 //todo
  end_time!: Date | null;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Scooter, (scooter) => scooter.id)
  scooter!: Scooter;
}
