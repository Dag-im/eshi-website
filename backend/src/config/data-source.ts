import 'reflect-metadata';
import path from 'path';
import { DataSource } from 'typeorm';
import { ContactMessageEntity } from '../entities/contact-message.entity';
import { HeroEntity } from '../entities/hero.entity';
import { ImpactEntity } from '../entities/impact.entity';
import { isTypeOrmConfigured, config } from '../lib/config';
import { PresentationEntity } from '../entities/presentation.entity';
import { ServiceEntity } from '../entities/service.entity';
import { TeamMemberEntity } from '../entities/team-member.entity';
import { UserEntity } from '../entities/user.entity';

// MIGRATION: initialize TypeORM alongside Mongoose during the staged MySQL rollout.
const migrationsPath = path.join(__dirname, '..', 'database', 'migrations', '*.{js,ts}');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [
    UserEntity,
    ServiceEntity,
    ContactMessageEntity,
    TeamMemberEntity,
    ImpactEntity,
    HeroEntity,
    PresentationEntity,
  ],
  migrations: [migrationsPath],
  synchronize: false,
  logging: false,
});

export async function initializeDataSource() {
  if (!isTypeOrmConfigured) {
    return null;
  }

  if (AppDataSource.isInitialized) {
    return AppDataSource;
  }

  return AppDataSource.initialize();
}
