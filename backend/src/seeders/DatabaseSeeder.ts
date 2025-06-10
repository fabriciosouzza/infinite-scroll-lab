import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductSeeder } from './ProductSeeder';
import { OrderSeeder } from './OrderSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    console.log('DatabaseSeeding...');
    return this.call(em, [ProductSeeder, OrderSeeder]);
  }
}
