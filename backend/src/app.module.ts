import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from 'mikro-orm.config';
import { OrderModule } from './order/order.module';
import { CoreModule } from './core/core.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5000,
    }),
    MikroOrmModule.forRoot(config),
    ProductModule,
    OrderModule,
    CoreModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
