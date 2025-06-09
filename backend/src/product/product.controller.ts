import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { QueryDto } from 'src/core/query.dto';
import { PaginatedResult } from 'src/core/pagination.interface';
import { Product } from './product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  async findAll(@Query() query: QueryDto): Promise<PaginatedResult<Product>> {
    return this.productService.findAll(query);
  }
}
