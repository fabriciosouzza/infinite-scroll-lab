import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
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

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  customer_name?: string;

  @IsEmail()
  @IsOptional()
  customer_email?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  products?: number[];

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
