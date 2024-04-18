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
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { CreateCourseDto } from 'src/dto/courseDto/createCourse.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { CourseService } from 'src/services/course.service';
import { CourseEntity } from 'src/entity/course.entity';
import { UpdateCourseDto } from 'src/dto/courseDto/updateCourseDto';
import { ContentDto } from 'src/dto/courseDto/content.dto';

@Controller('courses')
@ApiTags('Courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'create course' })
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() data: CreateCourseDto) {
    return await this.courseService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'get all Course' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'name query work only when pagination true',
  })
  async findAll(
    @Query() pageOptionDto: PageOptionsDto,
    @Query('name') name: string,
  ) {
    return await this.courseService.findAll(pageOptionDto, name);
  }

  @Get('/:courseId')
  @ApiOperation({ summary: 'get single course' })
  @ApiParam({ name: 'courseId', required: true })
  async getSingleCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return await this.courseService.singleCourse(courseId);
  }

  @Post('/:courseId/:studentId')
  @ApiOperation({ summary: 'enroll student' })
  @ApiParam({ name: 'courseId', required: true })
  @ApiParam({ name: 'studentId', required: true })
  async enrollStudent(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return await this.courseService.enrollStudent(courseId, studentId);
  }

  @Patch('/:courseId')
  @ApiOperation({
    summary: 'update student',
  })
  @ApiParam({ name: 'courseId' })
  async update(
    @Param('courseId', ParseIntPipe) courseId: Pick<CourseEntity, 'id'>,
    @Body() payload: UpdateCourseDto,
  ) {
    return await this.courseService.updateCourse(courseId, payload);
  }

  @Delete('/:courseId')
  @ApiOperation({ summary: 'delete course' })
  @ApiParam({ name: 'courseId' })
  async deleteCourse(
    @Param('courseId', ParseIntPipe) courseId: Pick<CourseEntity, 'id'>,
  ) {
    return this.courseService.deleteCourse(courseId);
  }

  @Patch('/:studentId/:courseId')
  @ApiOperation({ summary: 'add content' })
  @ApiParam({ name: 'studentId' })
  @ApiParam({ name: 'courseId' })
  async addContent(
    @Param('studentId') studentId: number,
    @Param('courseId') courseId: number,
    @Body() content: ContentDto,
  ) {
    console.log(studentId, content, 'content');

    return await this.courseService.updateContent(studentId, courseId, content);
  }
}
