import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ScooterService } from "./scooter.service";
import { ScooterController } from "./scooter.controller";
import { scooterProvider } from "./scooter.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [ScooterController],
  providers: [...scooterProvider, ScooterService],
  exports: [ScooterService],
})
export class ScooterModule {}
