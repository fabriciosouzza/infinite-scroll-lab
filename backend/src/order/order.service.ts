import { EntityManager, PopulatePath, QueryOrder, wrap } from '@mikro-orm/core';
import { ConflictException, Injectable } from '@nestjs/common';
import { PaginatedResult } from 'src/core/pagination.interface';
import { PaginationService } from 'src/core/pagination.service';
import { QueryDto } from 'src/core/query.dto';
import { Order } from './order.entity';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly em: EntityManager,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(query: QueryDto<Order>): Promise<PaginatedResult<Order>> {
    return this.paginationService.findAndPaginate<Order>(this.em, Order, {
      ...query,
      options: {
        fields: ['*', 'products'] as unknown as PopulatePath.ALL[],
        orderBy: { id: QueryOrder.ASC },
      },
    });
  }
  async findById(id: number): Promise<Order> {
    return await this.em.findOneOrFail(Order, { id });
  }

  async create(dto: OrderDto): Promise<Order> {
    const order = new Order(
      dto.customer_name,
      dto.customer_email,
      dto.reviewState,
      dto.status,
    );

    const updatedOrder = wrap(order).assign(
      { products: dto.products },
      { em: this.em },
    );

    await this.em.persist(updatedOrder).flush();
    return order;
  }

  async update(id: number, dto: OrderDto): Promise<Order> {
    const order = await this.findById(id);
    const updatedOrder = wrap(order).assign(dto);

    await this.em.persist(updatedOrder).flush();
    return updatedOrder;
  }

  //SoftDelete - Just change status
  async delete(id: number): Promise<void> {
    const order = await this.findById(id);

    if (!order.status) {
      throw new ConflictException('Order has already been deleted.');
    }

    const deletedOrder = wrap(order).assign({ status: false });
    await this.em.persist(deletedOrder).flush();
  }
}
