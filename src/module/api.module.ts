import { Module } from '@nestjs/common';
import { StudentModule } from './student.module';
import { CourseModule } from './course.module';
import { UploadModule } from './upload.module';

@Module({
  imports: [StudentModule, CourseModule, UploadModule],
})
export class ApiModule {}
