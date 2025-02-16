import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { ScooterModule } from "./modules/scooter/scooter.module";
import { RentModule } from "./modules/rent/rent.module";
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from "nestjs-i18n";
import path from "path";

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: "zh",
        loader: I18nJsonLoader,
        loaderOptions: {
          path: path.join(__dirname, "/i18n/"),
          watch: true,
          debug: true,
        },
        throwOnMissingKey: true,
      }),
      resolvers: [
        new QueryResolver(["lang", "l"]),
        new HeaderResolver(["x-custom-lang"]),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
    UserModule,
    ScooterModule,
    RentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
