import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => CourseEntity, (course) => course.department)
  course: CourseEntity[];
}
