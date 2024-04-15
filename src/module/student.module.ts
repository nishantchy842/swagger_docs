import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'src/controller/student.controller';
import { StudentEntity } from 'src/entity/student.entity';
import { StudentServices } from 'src/services/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [StudentServices],
  exports: [StudentServices],
})
export class StudentModule {}
