import { initializeDataSource } from '../config/data-source';
import { logger } from './logger';

export async function connectDb() {
  const dataSource = await initializeDataSource();
  if (!dataSource) {
    throw new Error('TypeORM configuration missing. DB_HOST/DB_USERNAME/DB_PASSWORD/DB_NAME are required.');
  }

  logger.info('MySQL connected through TypeORM');
}
