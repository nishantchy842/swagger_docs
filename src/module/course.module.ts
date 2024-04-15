import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from 'src/controller/course.controller';
import { CourseEntity } from 'src/entity/course.entity';
import { CourseService } from 'src/services/course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
