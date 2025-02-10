import { Module } from "@nestjs/common";
import { dbProviders } from "./database.providers";

@Module({
  imports: [],
  controllers: [],
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DatabaseModule {}
