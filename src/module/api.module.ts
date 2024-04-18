import { Module } from '@nestjs/common';
import { StudentModule } from './student.module';
import { CourseModule } from './course.module';
import { UploadModule } from './upload.module';
import { InstructorModule } from './instructor.module';

@Module({
  imports: [StudentModule, CourseModule, UploadModule, InstructorModule],
})
export class ApiModule {}
