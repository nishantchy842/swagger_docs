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
import { InstuctorEntity } from './intstructor.entity';
import { DepartmentEntity } from './department.entity';
import { IsNotEmpty } from 'class-validator';

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

  @ManyToOne(() => StudentEntity, (student) => student.couseres)
  student: StudentEntity;

  @ManyToOne(() => InstuctorEntity, (instructor) => instructor.course)
  @JoinColumn()
  instructor: InstuctorEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.course)
  @JoinTable()
  department: DepartmentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
