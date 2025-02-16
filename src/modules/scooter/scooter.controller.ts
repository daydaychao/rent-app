import { Controller, Get, Query } from "@nestjs/common";
import { ScooterService } from "./scooter.service";
import Scooter from "./scooter.entity";

@Controller("scooter")
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get("getScooterById")
  async getScooterById(
    @Query("scooterId") scooterId: number,
  ): Promise<Scooter> {
    const scooter = await this.scooterService.getScooterById(scooterId);
    return scooter;
  }
}
