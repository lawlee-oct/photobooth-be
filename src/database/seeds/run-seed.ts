import 'dotenv/config';

import { DataSource } from 'typeorm';

import { buildDatabaseConfig } from '../database.config';
import { seedSuperAdmin } from './super-admin.seed';

async function runSeeds() {
  const dataSource = new DataSource({
    ...buildDatabaseConfig(),
    entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
  });

  try {
    await dataSource.initialize();
    console.log('Database connected, running seeds...');

    await seedSuperAdmin(dataSource);

    console.log('All seeds completed!');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

void runSeeds();
