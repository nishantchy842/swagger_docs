import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
export class InstuctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CourseEntity, (course) => course.instructor)
  course: CourseEntity[];
}
