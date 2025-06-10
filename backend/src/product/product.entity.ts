import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Order } from 'src/order/order.entity';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @ManyToMany(() => Order, undefined, { mappedBy: 'products' })
  orders = new Collection<Order>(this);

  @Property()
  status: boolean;

  constructor(name: string, description: string, status: boolean) {
    this.name = name;
    this.status = status;
    this.description = description;
  }
}
