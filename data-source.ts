import 'dotenv/config';
import { DataSource } from 'typeorm';
import UserOrmEntity from './src/core/user/infrastructure/persistence/entity/user-orm.entity';
import TaskOrmEntity from './src/core/task/infrastructure/persistence/entity/task-orm.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [UserOrmEntity, TaskOrmEntity],
  migrations: ['./src/database/migrations/*.ts'],
  synchronize: false,
});
