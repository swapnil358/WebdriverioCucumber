import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const featureFileName = args.find(arg => arg.startsWith('--featureFile_name=')).split('=')[1];

if (!featureFileName) {
  console.error('Feature file name is required. Usage: npm run wdio-web-feature -- --featureFile_name=<file>');
  process.exit(1);
}

// Construct the command with the corrected path
const command = `npx wdio run ./wdio.conf.js --spec ${__dirname}/tests/features/web/${featureFileName}`;
console.log(`Running command: ${command}`);

execSync(command, { stdio: 'inherit' });
