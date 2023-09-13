import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' }); // CORS 허용
  app.use(cookieParser()); // cookieParser 사용
  await app.listen(5200);
}
bootstrap();
