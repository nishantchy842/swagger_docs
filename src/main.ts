import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useSwagger } from './config/config.swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  // app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(
    ['docs', 'docs-json'],
    basicAuth({
      challenge: true,
      users: { admin: 'password' },
    }),
  );

  useSwagger(app);

  await app.listen(port, () => {
    Logger.log(`🌨️  server running on ${port}`);
  });
}
bootstrap();
