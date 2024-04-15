import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageOptionsDto } from './page-option.dto';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  @IsArray()
  result: T[];

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(data: T[], itemCount: number, PageOptionsDto: PageOptionsDto) {
    this.result = data;
    PageOptionsDto ? (this.page = PageOptionsDto.page) : '';
    PageOptionsDto ? (this.take = PageOptionsDto.take) : '';
    itemCount ? (this.itemCount = itemCount) : '';
  }
}
