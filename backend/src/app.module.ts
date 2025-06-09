import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from 'mikro-orm.config';
import { OrderModule } from './order/order.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    ProductModule,
    OrderModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
