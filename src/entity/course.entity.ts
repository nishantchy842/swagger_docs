import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentEntity } from './student.entity';
import { InstructorEntity } from './intstructor.entity';
import { DepartmentEntity } from './department.entity';
import { IsNotEmpty } from 'class-validator';
import { ContentType } from 'src/common/type/content.type';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  title: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  description: string;

  @Column({ type: 'json', nullable: true })
  content: ContentType[];

  @ManyToOne(() => StudentEntity, (student) => student.courses)
  student: StudentEntity;

  @ManyToOne(() => InstructorEntity, (instructor) => instructor.course)
  @JoinColumn()
  instructor: InstructorEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.course)
  @JoinTable()
  department: DepartmentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
