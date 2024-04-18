import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCourseDto {
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
}
