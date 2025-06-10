import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsBoolean()
  @IsOptional()
  status: boolean = true;
}
