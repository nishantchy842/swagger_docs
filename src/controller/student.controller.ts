import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { CreateStudentDto } from 'src/dto/student/createStudent.dto';
import { StudentEntity } from 'src/entity/student.entity';
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

  @Get('/:studentId')
  @ApiOperation({ summary: 'get single student' })
  async getSingleStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return await this.studentService.singleSingleStudent(studentId);
  }

  @Get()
  @ApiOperation({ summary: 'get all student' })
  @ApiQuery({ name: 'name', required: false })
  async getAllStudent(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('name') name: string,
  ) {
    return await this.studentService.getAllStudent(pageOptionsDto, name);
  }

  @Patch('/:studentId')
  @ApiOperation({ summary: 'update student' })
  @ApiParam({ name: 'studentId' })
  async updateStudent(
    @Param('studentId') studentId: Pick<StudentEntity, 'id'>,
    @Body() updatePayload: CreateStudentDto,
  ) {
    return this.studentService.updateStudent(studentId, updatePayload);
  }

  @Delete('/:studentId')
  @ApiOperation({ summary: 'Delete student' })
  @ApiParam({ name: 'studentId' })
  async delete(
    @Param('studentId', ParseIntPipe) studentId: Pick<StudentEntity, 'id'>,
  ) {
    return this.studentService.delete(studentId);
  }
}
