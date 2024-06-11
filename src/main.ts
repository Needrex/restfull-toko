import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from './my-logger/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser('test'));
  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(5000);
}
bootstrap();
