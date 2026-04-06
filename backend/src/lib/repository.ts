import { EntityTarget, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';

export function getRepository<T extends object>(entity: EntityTarget<T>): Repository<T> {
  if (!AppDataSource.isInitialized) {
    throw new Error('TypeORM data source is not initialized.');
  }

  return AppDataSource.getRepository(entity);
}
