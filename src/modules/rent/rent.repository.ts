import { DataSource, EntityManager, IsNull, Repository } from "typeorm";
import Rent from "./rent.entity";
import { CreateRentDto } from "./dto/rent.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RentRepository {
  private readonly repository: Repository<Rent>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Rent);
  }

  /**
   * 查詢使用者租借狀態
   * @param userId 使用者id
   * @param manager
   * @returns
   */
  async getActiveRentalByUserId(
    userId: number,
    manager?: EntityManager,
  ): Promise<Rent | null> {
    const repository = manager ? manager.getRepository(Rent) : this.repository;

    const rent = await repository.findOne({
      where: {
        user: {
          id: userId,
        },
        end_time: IsNull(),
      },
      relations: ["user", "scooter"],
    });
    return rent;
  }

  /**
   * 查詢車輛租借狀態
   * @param scooterId 車輛id
   * @param manager
   * @returns
   */
  async getActiveRentalByScooterId(
    scooterId: number,
    manager?: EntityManager,
  ): Promise<Rent | null> {
    const repository = manager ? manager.getRepository(Rent) : this.repository;
    return await repository.findOne({
      where: {
        scooter: {
          id: scooterId,
        },
        end_time: IsNull(),
      },
      relations: ["user", "scooter"], // 取得租借人與車輛資訊
    });
  }

  //新增租借
  async createRent(dto: CreateRentDto) {
    const rent = this.repository.create({
      start_time: dto.startTime,
      end_time: dto.endTime,
      user: dto.user,
      scooter: dto.scooter,
    });
    return await this.repository.save(rent);
  }
}
