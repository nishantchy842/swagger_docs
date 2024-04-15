import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from 'src/dto/student/createStudent.dto';
import { StudentEntity } from 'src/entity/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentServices {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
  ) {}

  async create(data: CreateStudentDto) {
    try {
      const res = await this.studentRepo.save(data);

      return {
        message: 'Created successfull',
        result: res,
      };
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
