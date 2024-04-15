import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useSwagger } from './config/config.swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  useSwagger(app);

  await app.listen(port, () => {
    console.log('server running on port ', port);
  });
}
bootstrap();
