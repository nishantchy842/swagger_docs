import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationEnum } from 'src/common/enum/pagination';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { CourseEntity } from 'src/entity/course.entity';
import { Repository } from 'typeorm';
import { StudentServices } from './student.service';
import { UpdateCourseDto } from 'src/dto/courseDto/updateCourseDto';
import { CreateType } from 'src/common/type/createType';
import { ContentDto } from 'src/dto/courseDto/content.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    private readonly studentService: StudentServices,
  ) {}

  async create(data) {
    try {
      console.log(data, 'data');
      const res = await this.courseRepository.save(data);
      return {
        message: 'created successfully',
        result: res,
      };
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async updateCourse(
    courseId: Pick<CourseEntity, 'id'>,
    payload: UpdateCourseDto,
  ): Promise<CreateType<CourseEntity>> {
    const course = await this.singleCourse(Number(courseId));

    if (!course) {
      throw new NotFoundException('courseid not found');
    }

    const res = await this.courseRepository.update(courseId, payload);

    return {
      message: 'updated successfully',
      result: res as any,
    };
  }

  async findAll(
    pageOptionDto: PageOptionsDto,
    name: string,
  ): Promise<PageDto<CourseEntity>> {
    console.log(name, 'option');

    const { pagination, take, page, order } = pageOptionDto;

    const query = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.student', 'student')
      .leftJoinAndSelect('course.instructor', 'instructor')

      .select(['course', 'student.id', 'instructor.id']); // Select the course data and the studentId

    let courses = null;
    let queryBuilder = query;

    const itemCount = await query.getCount();

    if (pagination === PaginationEnum.false) {
      courses = await query.getMany();
      return new PageDto(courses, itemCount, null);
    }

    queryBuilder = queryBuilder
      .take(take)
      .skip((page - 1) * take)
      .orderBy('course.updatedAt', order);

    if (name) {
      queryBuilder = query.where('course.title LIKE :name', {
        name: `%${name}%`,
      });
    }

    courses = await queryBuilder.getMany(); // Execute the query

    return new PageDto(courses, itemCount, pageOptionDto);
  }

  async singleCourse(courseId: number): Promise<CourseEntity> {
    // const course = await this.courseRepository.findOne({
    //   where: { id: courseId },
    // });
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.student', 'student')
      .select(['course', 'student.id'])
      .where('course.id = :id', { id: courseId })
      .getOne();

    if (!course) {
      throw new NotFoundException(courseId + ' courseId not found');
    }

    return course;
  }

  async enrollStudent(courseId: number, studentId: number) {
    const courses = await this.singleCourse(courseId);

    const student = await this.studentService.singleSingleStudent(studentId);

    if (courses.student.id === studentId) {
      return {
        message: 'already student enrolled ',
      };
    }

    courses.student = student;

    await this.courseRepository.save(courses);

    return {
      message: 'Successful enrolled',
      courses,
    };
  }

  async deleteCourse(courseId: Pick<CourseEntity, 'id'>) {
    const course = await this.singleCourse(Number(courseId));

    if (!course) {
      throw new NotFoundException('course id ' + courseId + 'does not exists');
    }
    await this.courseRepository.delete(courseId);

    return {
      message: 'Deleted successfully',
    };
  }

  async updateContent(
    studentId: number,
    courseId: number,
    content: ContentDto,
  ): Promise<CourseEntity> {
    const student = await this.studentService.singleSingleStudent(studentId);
    if (!student) {
      throw new Error(`Student with ID ${studentId} not found.`);
    }

    const course = await this.singleCourse(courseId);

    if (!course) {
      throw new Error(`Course with ID ${courseId} not found.`);
    }

    if (!course.content) {
      course.content = [];
    }

    course.content.push({ content: content.content, studentId: student.id });

    const updatedCourse = await this.courseRepository.save(course);

    return updatedCourse;
  }
}
