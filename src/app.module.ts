import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScooterController } from "./modules/scooter/scooter.controller";
import { RentController } from "./modules/rent/rent.controller";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [AppController, ScooterController, RentController],
  providers: [AppService],
})
export class AppModule {}
