import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/dto/student/createStudent.dto';
import { StudentServices } from 'src/services/student.service';

@Controller('students')
@ApiTags('Students')
export class StudentController {
  constructor(private readonly studentService: StudentServices) {}

  @Post()
  @ApiOperation({ summary: 'create Students' })
  async create(@Body() data: CreateStudentDto) {
    return await this.studentService.create(data);
  }
}
