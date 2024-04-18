import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstructorDto {
  @ApiProperty({
    example: 'Physics',
    description: 'Your course title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
