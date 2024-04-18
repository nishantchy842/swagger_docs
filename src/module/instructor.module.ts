import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorController } from 'src/controller/instructor.controller';
import { InstructorEntity } from 'src/entity/intstructor.entity';
import { InstructorServices } from 'src/services/instructor.service';
import { CourseModule } from './course.module';

@Module({
  imports: [TypeOrmModule.forFeature([InstructorEntity]), CourseModule],
  controllers: [InstructorController],
  providers: [InstructorServices],
})
export class InstructorModule {}
