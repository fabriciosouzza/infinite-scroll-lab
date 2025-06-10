import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from 'src/product/product.entity';

export enum ReviewState {
  APPROVED = 'A',
  REJECTED = 'R',
  PENDING = 'P',
}

@Entity()
export class Order {
  @PrimaryKey()
  id!: number;

  @Property()
  customer_name: string;

  @Property()
  customer_email: string;

  @ManyToMany(() => Product, (product) => product.orders)
  products = new Collection<Product>(this);

  @Enum(() => ReviewState)
  reviewState: ReviewState;

  @Property()
  status: boolean;

  constructor(
    customer_name: string,
    customer_email: string,
    reviewState: ReviewState,
    status: boolean,
  ) {
    this.customer_name = customer_name;
    this.customer_email = customer_email;
    this.reviewState = reviewState;
    this.status = status;
  }
}
