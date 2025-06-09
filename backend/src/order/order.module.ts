import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  imports: [MikroOrmModule.forFeature({ entities: [Order] })],
  providers: [OrderService],
})
export class OrderModule {}
