import { EntityManager, wrap } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Product } from 'src/product/product.entity';
import { Order } from 'src/order/order.entity';

export class OrderSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('OrderSeeding...');

    const products = await em.find(Product, {});

    if (products.length === 0) {
      console.log(
        'No products found to create orders. Run ProductSeeder first',
      );
      return;
    }

    for (let i = 0; i < 1500; i++) {
      const customerName = faker.person.fullName();
      const customerEmail = faker.internet.email({ firstName: customerName });

      const orderProducts = faker.helpers.arrayElements(products, {
        min: 1,
        max: 3,
      });

      const order = new Order(
        customerName,
        customerEmail,
        faker.datatype.boolean(),
      );

      const updatedOrder = wrap(order).assign(
        { products: orderProducts },
        { em: em },
      );

      em.persist(updatedOrder);
    }
  }
}
