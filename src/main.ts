import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata";
import { ApplicationErrorFilter } from "./applicationError.filter";
import { I18nService } from "nestjs-i18n";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 註冊全域的錯誤處理器
  app.useGlobalFilters(new ApplicationErrorFilter(app.get(I18nService)));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
