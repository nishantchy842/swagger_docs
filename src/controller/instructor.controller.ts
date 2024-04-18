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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { CreateInstructorDto } from 'src/dto/instructor/createInstructor.dto';
import { InstructorServices } from 'src/services/instructor.service';

@Controller('instructors')
@ApiTags('Instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorServices) {}

  @Post()
  @ApiOperation({ summary: 'create instructor' })
  async create(@Body() payload: CreateInstructorDto) {
    return await this.instructorService.create(payload);
  }

  @Get('/:instructor')
  @ApiOperation({ summary: 'get single instructor' })
  @ApiParam({ name: 'instructorId' })
  async single(@Param('instructorId') instructorId: number) {
    return await this.instructorService.single(instructorId);
  }

  @Delete('/:instructionId')
  @ApiOperation({ summary: 'delete instruction' })
  @ApiParam({ name: 'instructionId' })
  async delete(@Param('instructionId') instructionId: number) {
    return await this.instructorService.delete(instructionId);
  }

  @Get()
  @ApiOperation({ summary: 'get all instructors' })
  async findAll(@Query() pageOptionDto: PageOptionsDto) {
    return this.instructorService.findAll(pageOptionDto);
  }

  @Patch('/:instructorId/:courseId')
  @ApiOperation({ summary: 'assign instructor' })
  async assignInstructor(
    @Param('instructorId') instructorId: number,
    @Param('courseId') courseId: number,
  ) {
    return await this.instructorService.assignCourse(instructorId, courseId);
  }

  @Delete('/:instructorId/:courseId')
  @ApiOperation({ summary: 'remove course' })
  async removeCourse(
    @Param('instructorId', ParseIntPipe) instructorId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return await this.instructorService.removeCourse(instructorId, courseId);
  }
}
