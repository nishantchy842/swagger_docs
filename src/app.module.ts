import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ApiModule } from './module/api.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'], // if there is multiple .evn file
      cache: true, //next time take data from cache
      isGlobal: true, // no need to import config module in every module
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'uploads'),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'), // Add your MySQL password here
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/**.entity{.ts,.js}'],
          synchronize: configService.get('DB_SYNC'),
        } as TypeOrmModuleAsyncOptions;
      },
    }),

    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// TypeOrmModule.forRoot({
//   // type: 'mysql',
//   type: 'postgres',
//   host: 'localhost',
//   port: 3030,
//   username: 'postgres',
//   password: 'nishant@123', // Add your MySQL password here
//   database: 'firstdatabase',
//   synchronize: true,

//   entities: [__dirname + '/**/**.entity{.ts,.js}'],
// }),
