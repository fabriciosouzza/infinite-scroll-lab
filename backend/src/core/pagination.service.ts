import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityName,
  FindOptions,
  Loaded,
} from '@mikro-orm/core';
import { QueryDto } from './query.dto';
import { PaginatedResult } from './pagination.interface';

@Injectable()
export class PaginationService {
  async findAndPaginate<T extends object, P extends string = never>(
    em: EntityManager,
    entityName: EntityName<T>,
    queryDto: QueryDto,
    findOptions: FindOptions<T, P> = {},
  ): Promise<PaginatedResult<Loaded<T, P>>> {
    const { limit, offset } = queryDto;

    findOptions.limit = limit;
    findOptions.offset = offset;

    const [data, total] = await em.findAndCount(entityName, {}, findOptions);

    return this.paginate(data, total, limit, offset);
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
