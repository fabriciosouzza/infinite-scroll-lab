import { Migration } from '@mikro-orm/migrations';

export class Migration20250610112542 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "order" add column "review_state" text check ("review_state" in ('A', 'R', 'P')) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order" drop column "review_state";`);
  }

}
