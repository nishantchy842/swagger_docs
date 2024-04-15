import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => CourseEntity, (course) => course.student)
  couseres: CourseEntity[];
}
