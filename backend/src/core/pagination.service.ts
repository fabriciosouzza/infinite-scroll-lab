import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityName,
  FilterQuery,
  FindOptions,
  Loaded,
} from '@mikro-orm/core';
import { QueryDto } from './query.dto';
import { PaginatedResult } from './pagination.interface';

@Injectable()
export class PaginationService {
  readonly DEFAULT_PAGE = 1;
  readonly DEFAULT_PAGE_SIZE = 25;

  async findAndPaginate<T extends object, P extends string = never>(
    em: EntityManager,
    entityName: EntityName<T>,
    queryDto: QueryDto<T>,
  ): Promise<PaginatedResult<Loaded<T, P>>> {
    const {
      where = {} as FilterQuery<T>,
      options = {} as FindOptions<T, P>,
      page = this.DEFAULT_PAGE,
      page_size = this.DEFAULT_PAGE_SIZE,
    } = queryDto;

    const offset = (page - 1) * page_size;

    const findOptions: FindOptions<T, P> = {
      ...options,
      limit: page_size,
      offset: offset,
    };

    findOptions.limit = page_size;
    findOptions.offset = offset;

    const [data, total] = await em.findAndCount(entityName, where, findOptions);

    return this.paginate(data, total, page_size, offset);
  }

  private paginate<T>(
    data: T[],
    total: number,
    limit: number,
    offset: number,
  ): PaginatedResult<T> {
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = currentPage < totalPages;

    return {
      data: data,
      meta: {
        page: currentPage,
        perPage: limit,
        hasNextPage: hasNextPage,
        totalPages: totalPages,
        totalItems: total,
      },
    };
  }
}
