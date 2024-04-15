import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCourseDto } from '../courseDto/createCourse.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    example: 'Nishant Chaudhary',
    description: 'Your full name',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'nishant@gmail.com',
    description: 'Your email address',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: [CreateCourseDto],
    description: 'Array of courses associated with the student',
    required: false, // Assuming this property is optional
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseDto)
  readonly courses: CreateCourseDto[];
}
