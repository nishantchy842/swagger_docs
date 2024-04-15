import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { CreateCourseDto } from 'src/dto/courseDto/createCourse.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { CourseService } from 'src/services/course.service';

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
}
