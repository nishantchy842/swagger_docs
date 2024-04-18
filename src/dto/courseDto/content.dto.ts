import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContentDto {
  @ApiProperty({
    example: 'Physics',
    description: 'Your course title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
