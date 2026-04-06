import { execSync } from 'child_process';

try {
  console.log('Running TypeORM migrations...');
  execSync('npm run typeorm:migration:run', { stdio: 'inherit' });

  console.log('Running database seeds...');
  execSync('ts-node src/database/seeds/index.ts', { stdio: 'inherit' });

  console.log('Database bootstrap complete.');
} catch (error) {
  console.error('Database bootstrap failed:', error);
  process.exit(1);
}
