import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildDatabaseConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...buildDatabaseConfig(),
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC === 'true',
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
