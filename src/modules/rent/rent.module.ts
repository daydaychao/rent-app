import { Module } from "@nestjs/common";
import { RentController } from "./rent.controller";
import { rentProvider } from "./rent.provider";
import { RentService } from "./rent.service";
import { DatabaseModule } from "../database/database.module";
import { userProvider } from "../user/user.provider";
import { UserService } from "../user/user.service";
import { scooterProvider } from "../scooter/scooter.provider";
import { ScooterService } from "../scooter/scooter.service";

@Module({
  imports: [DatabaseModule],
  controllers: [RentController],
  providers: [
    ...rentProvider,
    RentService,
    ...userProvider,
    UserService,
    ...scooterProvider,
    ScooterService,
  ],
  exports: [RentService],
})
export class RentModule {}
