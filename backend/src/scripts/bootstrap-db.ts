import { execSync } from 'child_process';

function run(command: string, label: string) {
  console.log(`\n[bootstrap-db] ${label}`);
  execSync(command, { stdio: 'inherit' });
}

try {
  run('node ./node_modules/typeorm/cli.js migration:run -d dist/config/data-source.js', 'Running migrations');
  run('node dist/database/seeds/index.js', 'Running seeds');
  console.log('\n[bootstrap-db] Database bootstrap complete.');
} catch (error) {
  console.error('\n[bootstrap-db] Database bootstrap failed:', error);
  process.exit(1);
}
