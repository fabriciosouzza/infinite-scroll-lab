import { Migration } from '@mikro-orm/migrations';

export class Migration20250609202526 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "order" ("id" serial primary key, "customer_name" varchar(255) not null, "customer_email" varchar(255) not null, "status" boolean not null);`);

    this.addSql(`create table "product" ("id" serial primary key, "name" varchar(255) not null, "category" varchar(255) not null, "status" boolean not null);`);

    this.addSql(`create table "product_orders" ("product_id" int not null, "order_id" int not null, constraint "product_orders_pkey" primary key ("product_id", "order_id"));`);

    this.addSql(`alter table "product_orders" add constraint "product_orders_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "product_orders" add constraint "product_orders_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product_orders" drop constraint "product_orders_order_id_foreign";`);

    this.addSql(`alter table "product_orders" drop constraint "product_orders_product_id_foreign";`);

    this.addSql(`drop table if exists "order" cascade;`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "product_orders" cascade;`);
  }

}
