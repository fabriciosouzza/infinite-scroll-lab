import { IsNumber, IsObject, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterQuery, FindOptions } from '@mikro-orm/core';

export class QueryDto<T extends object = any> {
  @IsOptional()
  @IsObject()
  where?: FilterQuery<T>;

  @IsOptional()
  @IsObject()
  options?: FindOptions<T>;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page_size: number = 25;
}
