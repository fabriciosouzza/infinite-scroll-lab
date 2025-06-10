import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ReviewState } from './order.entity';

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

  @IsEnum(ReviewState)
  @IsNotEmpty()
  reviewState!:
    | ReviewState.APPROVED
    | ReviewState.PENDING
    | ReviewState.REJECTED;

  @IsBoolean()
  @IsOptional()
  status: boolean = true;
}
