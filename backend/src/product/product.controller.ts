import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { QueryDto } from 'src/core/query.dto';
import { PaginatedResult } from 'src/core/pagination.interface';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  async findAll(
    @Query() query: QueryDto<Product>,
  ): Promise<PaginatedResult<Product>> {
    return this.productService.findAll(query);
  }

  @Get('products/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post('products')
  async create(@Body() dto: ProductDto): Promise<Product> {
    return this.productService.create(dto);
  }

  @Put('products/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProductDto,
  ): Promise<Product> {
    return this.productService.update(id, dto);
  }

  //SoftDelete - Just change status
  @Delete('products/:id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productService.delete(id);
  }
}
