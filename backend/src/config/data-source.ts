import 'reflect-metadata';
import path from 'path';
import { DataSource } from 'typeorm';
import { ContactMessageEntity } from '../entities/contact-message.entity';
import { AboutEntity } from '../entities/about.entity';
import { BeliefEntity } from '../entities/belief.entity';
import { HeroEntity } from '../entities/hero.entity';
import { HeroContentEntity } from '../entities/hero-content.entity';
import { ImpactEntity } from '../entities/impact.entity';
import { MissionStoryEntity } from '../entities/mission-story.entity';
import { isTypeOrmConfigured, config } from '../lib/config';
import { PresentationEntity } from '../entities/presentation.entity';
import { ApproachEntity } from '../entities/approach.entity';
import { MethodologyPhaseEntity } from '../entities/methodology-phase.entity';
import { ServiceCardEntity } from '../entities/service-card.entity';
import { WhyChooseReasonEntity } from '../entities/why-choose-reason.entity';
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
    AboutEntity,
    BeliefEntity,
    TeamMemberEntity,
    ImpactEntity,
    HeroEntity,
    HeroContentEntity,
    MissionStoryEntity,
    PresentationEntity,
    ApproachEntity,
    MethodologyPhaseEntity,
    ServiceCardEntity,
    WhyChooseReasonEntity,
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
