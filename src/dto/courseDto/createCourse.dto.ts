import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Physics',
    description: 'Your course title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'course description',
    description: 'write description',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 'course description',
  })
  @IsOptional()
  @IsNotEmpty()
  readonly student: number;

  @ApiProperty({
    example: 'course description',
  })
  @IsOptional()
  @IsNotEmpty()
  readonly instructor: number;

  @ApiProperty({
    example: 'course description',
  })
  @IsOptional()
  @IsNotEmpty()
  readonly departmentId: number;
}
