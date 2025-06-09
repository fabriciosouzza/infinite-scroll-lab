import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  status: boolean;

  constructor(name: string, status: boolean) {
    this.name = name;
    this.status = status;
  }
}
