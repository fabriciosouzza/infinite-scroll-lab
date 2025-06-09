import { Injectable } from '@nestjs/common';
import { PaginationService } from '../core/pagination.service';
import { EntityManager } from '@mikro-orm/core';
import { QueryDto } from 'src/core/query.dto';
import { Product } from './product.entity';
import { PaginatedResult } from 'src/core/pagination.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(query: QueryDto): Promise<PaginatedResult<Product>> {
    return this.paginationService.findAndPaginate<Product>(
      this.em,
      Product,
      query,
    );
  }
}
