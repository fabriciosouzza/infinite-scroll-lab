import { ConflictException, Injectable } from '@nestjs/common';
import { PaginationService } from '../core/pagination.service';
import { EntityManager, wrap } from '@mikro-orm/core';
import { QueryDto } from 'src/core/query.dto';
import { Product } from './product.entity';
import { PaginatedResult } from 'src/core/pagination.interface';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(query: QueryDto<Product>): Promise<PaginatedResult<Product>> {
    return this.paginationService.findAndPaginate<Product>(
      this.em,
      Product,
      query,
    );
  }
  async findById(id: number): Promise<Product> {
    return await this.em.findOneOrFail(Product, { id });
  }

  async create(dto: ProductDto): Promise<Product> {
    const product = new Product(dto.name, dto.description, dto.status);
    await this.em.persist(product).flush();
    return product;
  }

  async update(id: number, dto: ProductDto): Promise<Product> {
    const product = await this.findById(id);
    const updatedProduct = wrap(product).assign(dto);

    await this.em.persist(updatedProduct).flush();
    return updatedProduct;
  }

  //SoftDelete - Just change status
  async delete(id: number): Promise<void> {
    const product = await this.findById(id);

    if (!product.status) {
      throw new ConflictException('Product has already been deleted.');
    }

    const deletedProduct = wrap(product).assign({ status: false });
    await this.em.persist(deletedProduct).flush();
  }
}
