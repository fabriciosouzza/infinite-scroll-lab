import { Migration } from '@mikro-orm/migrations';

export class Migration20250610022440 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "product" rename column "category" to "description";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product" rename column "description" to "category";`);
  }

}
