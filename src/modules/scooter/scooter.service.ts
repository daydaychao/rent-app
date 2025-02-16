import { Injectable, Inject } from "@nestjs/common";
import { SCOOTER_REPOSITORY } from "../../common/constants/database.constants";
import { ScooterRepository } from "./scooter.repository";
import Scooter from "./scooter.entity";

@Injectable()
export class ScooterService {
  constructor(
    @Inject(SCOOTER_REPOSITORY)
    private scooterRepository: ScooterRepository,
  ) {}

  async getScooterById(scooterId: number): Promise<Scooter> {
    const scooter = await this.scooterRepository.getScooterById(scooterId);
    return scooter;
  }
}
