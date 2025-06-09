import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Order {
  @PrimaryKey()
  id!: number;

  @Property()
  customer_name: string;

  @Property()
  customer_email: string;

  @Property()
  status: boolean;

  constructor(customer_name: string, customer_email: string, status: boolean) {
    this.customer_name = customer_name;
    this.customer_email = customer_email;
    this.status = status;
  }
}
