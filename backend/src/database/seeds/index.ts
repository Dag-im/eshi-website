import { initializeDataSource } from '../../config/data-source';
import { AdminSeed } from './admin.seed';
import { PresentationSeed } from './presentation.seed';
import { Seed } from './types';

const seeds: Seed[] = [new AdminSeed(), new PresentationSeed()];

async function runSeeds() {
  await initializeDataSource();

  for (const seed of seeds) {
    await seed.run();
  }

  process.exit(0);
}

runSeeds().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
