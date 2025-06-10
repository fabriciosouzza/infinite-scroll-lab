import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Product } from 'src/product/product.entity';

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('ProductSeeding...');

    for (let i = 0; i < 30; i++) {
      em.create(Product, {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        status: true,
      });
    }
  }
}
