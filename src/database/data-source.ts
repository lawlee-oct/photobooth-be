import 'dotenv/config';
import { DataSource } from 'typeorm';
import { buildDatabaseConfig } from './database.config';

const isTs = __filename.endsWith('.ts');

export const AppDataSource = new DataSource({
  ...buildDatabaseConfig(),
  entities: isTs ? ['src/entities/*.entity.ts'] : ['dist/entities/*.entity.js'],
  migrations: isTs
    ? ['src/migrations/*.{ts,js}']
    : ['dist/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});
