import { DataSource, EntityManager, Repository } from "typeorm";
import Scooter from "./scooter.entity";
import { Injectable } from "@nestjs/common";
import { ApplicationError } from "../../applicationError";

@Injectable()
export class ScooterRepository {
  private readonly repository: Repository<Scooter>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Scooter);
  }

  async getScooterById(
    scooterId: number,
    manager?: EntityManager,
  ): Promise<Scooter> {
    const repository = manager
      ? manager.getRepository(Scooter)
      : this.repository;
    const scooter = await repository.findOne({
      where: {
        id: scooterId,
      },
    });
    if (!scooter) throw new ApplicationError("errors.A002");
    return scooter;
  }
}
