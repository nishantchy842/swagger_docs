import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentEntity } from './entity/student.entity';
import { CourseEntity } from './entity/course.entity';
import { InstuctorEntity } from './entity/intstructor.entity';
import { DepartmentEntity } from './entity/department.entity';
import { ApiModule } from './module/api.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Add your MySQL password here
      database: 'test',
      synchronize: true,

      entities: [
        StudentEntity,
        CourseEntity,
        InstuctorEntity,
        DepartmentEntity,
      ],
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
