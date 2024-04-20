import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationEnum } from 'src/common/enum/pagination';
import { StudentCreateSchema } from 'src/common/joiSchema/student.schema';
import { PageOptionsDto } from 'src/common/pagination/page-option.dto';
import { PageDto } from 'src/common/pagination/page.dto';
import { CreateType } from 'src/common/type/createType';
import { StudentEntity } from 'src/entity/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentServices {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
  ) {}

  /** _--------------------------------create ---------------------------------------- */

  async create(payload): Promise<CreateType<StudentEntity>> {
    const { value, error } = await StudentCreateSchema.validate(payload);

    console.log(value, error);

    if (error) {
      throw new Error(error.details[0].message);
    }
    const res = await this.studentRepo.save(value);

    return {
      message: 'created successfully',
      result: res,
    };
  }

  /** _--------------------------------Update ---------------------------------------- */

  async updateStudent(studentId: Pick<StudentEntity, 'id'>, payload) {
    const res = await this.studentRepo.update(studentId, payload);

    return {
      message: 'updated successfully',
      result: res,
    };
  }

  /** _--------------------------------GET SINGLE ---------------------------------------- */

  async singleSingleStudent(studentId: number): Promise<StudentEntity> {
    const student = await this.studentRepo
      .createQueryBuilder('student')
      .where('student.id = :id', { id: studentId })
      .leftJoinAndSelect('student.courses', 'courses')
      .getOne();

    if (!student) {
      throw new NotFoundException(studentId + 'studentid do not exists');
    }

    return student;
  }

  /** _--------------------------------GET ALL ---------------------------------------- */
  async getAllStudent(
    pageOptionsDto: PageOptionsDto,
    name: string,
  ): Promise<PageDto<StudentEntity>> {
    const { page, pagination, take, order } = pageOptionsDto;

    const query = await this.studentRepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.courses', 'courses');

    const itemCount = await query.getCount();

    if (pagination === PaginationEnum.false) {
      const student = await query.getMany();

      return new PageDto(student, itemCount, null);
    }

    let queryBuilder = query
      .take(take)
      .skip((page - 1) * take)
      .orderBy('student.updatedAt', order);

    console.log(name, 'name');
    if (name) {
      queryBuilder = queryBuilder.andWhere(
        'LOWER(student.name) LIKE LOWER(:name)',
        {
          name: `%${name}%`,
        },
      );
    }

    const student = await queryBuilder.getMany();

    return new PageDto(student, itemCount, pageOptionsDto);
  }

  /** _--------------------------------Delete ---------------------------------------- */

  async delete(
    studentId: Pick<StudentEntity, 'id'>,
  ): Promise<{ message: string; data: any }> {
    const res = await this.studentRepo.delete(studentId);

    return {
      message: 'Deleted successfully',
      data: res,
    };
  }
}
