import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationEnum } from 'src/common/enum/pagination';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { CourseEntity } from 'src/entity/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async create(data) {
    try {
      const res = await this.courseRepository.save(data);
      return {
        message: 'created successfull',
        result: res,
      };
    } catch (error) {
      throw new ForbiddenException();
    }
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
      .select(['course', 'student.id']); // Select the course data and the studentId

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
}
