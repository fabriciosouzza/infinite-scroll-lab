import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from 'mikro-orm.config';

@Module({
  imports: [ProductModule, MikroOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
