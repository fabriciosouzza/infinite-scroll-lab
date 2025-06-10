import { Options, LoadStrategy } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';

const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,

  host: 'postgres',
  port: 5432,
  user: 'root',
  password: 'root',
  dbName: 'nest-lab',

  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],

  extensions: [EntityGenerator, Migrator],
  loadStrategy: LoadStrategy.JOINED,
  debug: true,
  seeder: {
    path: './src/seeders',
    pathTs: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
};

export default config;
