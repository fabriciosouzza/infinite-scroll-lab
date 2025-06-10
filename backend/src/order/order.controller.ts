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
import { OrderService } from './order.service';
import { PaginatedResult } from 'src/core/pagination.interface';
import { Order } from './order.entity';
import { QueryDto } from 'src/core/query.dto';
import { OrderDto } from './order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders')
  async findAll(
    @Query() query: QueryDto<Order>,
  ): Promise<PaginatedResult<Order>> {
    return this.orderService.findAll(query);
  }

  @Get('orders/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Post('orders')
  async create(@Body() dto: OrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Put('orders/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: OrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, dto);
  }

  //SoftDelete - Just change status
  @Delete('orders/:id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.orderService.delete(id);
  }
}
