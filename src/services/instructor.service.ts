import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationEnum } from 'src/common/enum/pagination';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { CreateType } from 'src/common/type/createType';
import { CreateInstructorDto } from 'src/dto/instructor/createInstructor.dto';
import { InstructorEntity } from 'src/entity/intstructor.entity';
import { Repository } from 'typeorm';
import { CourseService } from './course.service';

@Injectable()
export class InstructorServices {
  constructor(
    @InjectRepository(InstructorEntity)
    private readonly instructorRepo: Repository<InstructorEntity>,
    private readonly courseService: CourseService,
  ) {}

  async single(instructorId): Promise<InstructorEntity> {
    const res = await this.instructorRepo.findOne({
      where: { id: instructorId },
      relations: ['course'],
    });

    if (!res) {
      throw new NotFoundException('not found');
    }

    return res;
  }

  async create(
    payload: CreateInstructorDto,
  ): Promise<CreateType<InstructorEntity>> {
    const instructor = await this.instructorRepo.save(payload);

    return {
      message: 'Created successfully',
      result: instructor,
    };
  }

  async delete(
    instructionId: number,
  ): Promise<{ message: string; result: any }> {
    const res = await this.instructorRepo.delete(instructionId);
    return {
      message: 'deleted successfull',
      result: res,
    };
  }

  async findAll(
    pageOptionDto: PageOptionsDto,
    // name: Pick<InstructorEntity, 'name'>,
  ): Promise<PageDto<InstructorEntity>> {
    const { page, take, pagination, order } = pageOptionDto;

    if (pagination === PaginationEnum.false) {
      const [instructors, itemCount] = await this.instructorRepo.findAndCount({
        relations: ['course'],
      });

      return new PageDto(instructors, itemCount, null);
    }

    const itemCount = await this.instructorRepo.count();

    console.log(itemCount);
    const instruction = await this.instructorRepo.find({
      relations: ['course'],
      take,
      skip: (page - 1) * take,
      order: {
        updatedAt: order,
      },
    });
    return new PageDto(instruction, itemCount, pageOptionDto);
  }

  async assignCourse(
    instructorId: number,
    courseId: number,
  ): Promise<{ message: string; result: InstructorEntity }> {
    const instructor = await this.single(instructorId);

    if (!instructor) {
      throw new NotFoundException('Instructor nor found');
    }

    const course = await this.courseService.singleCourse(courseId);

    if (!course) {
      throw new NotFoundException('course not found');
    }

    if (!instructor.course) {
      instructor.course = [];
    }
    instructor.course.push(course);

    const assignInstructor = await this.instructorRepo.save(instructor);

    return {
      message: 'Assign successfully',
      result: assignInstructor,
    };
  }

  async removeCourse(
    instructorId: number,
    courseId: number,
  ): Promise<{ message: string; result: InstructorEntity }> {
    const instructor = await this.single(instructorId);

    if (!instructor) {
      throw new NotFoundException('Instructor nor found');
    }

    const course = await this.courseService.singleCourse(courseId);

    if (!course) {
      throw new NotFoundException('course not found');
    }

    const courseIndex = instructor.course.findIndex(
      (item) => item.id === courseId,
    );

    instructor.course.splice(courseIndex, 1);

    const instructors = await this.instructorRepo.save(instructor);

    return {
      message: 'Assign successfully',
      result: instructors,
    };
  }
}
