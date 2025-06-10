import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsEmail()
  @IsNotEmpty()
  customer_email: string;

  @IsArray()
  @IsNumber({}, { each: true })
  products: number[];

  @IsBoolean()
  @IsOptional()
  status: boolean = true;
}
