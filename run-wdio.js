import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const featureFileName = args.find(arg => arg.startsWith('--FeatureFileName=')).split('=')[1];

if (!featureFileName) {
  console.error('Feature file name is required. Usage: npm run wdio-web-feature -- --FeatureFileName=<file>');
  process.exit(1);
}

// Determine test type and corresponding config file based on feature file name pattern
let testType, configFile;
if (featureFileName.startsWith('web_')) {
  testType = 'web';
  configFile = 'wdio.conf.js'; // Web configuration file
} else if (featureFileName.startsWith('mobile_')) {
  testType = 'mobile';
  configFile = 'appium.conf.js'; // Mobile/Appium configuration file
} else if (featureFileName.startsWith('api_')) {
  testType = 'api';
  configFile = 'api.conf.js'; // API configuration file
} else {
  console.error('Invalid feature file name pattern. It should start with web_, mobile_, or api_.');
  process.exit(1);
}

// Construct the command dynamically based on the inferred test type and config file
const command = `npx wdio run ./${configFile} --spec ${__dirname}/tests/features/${testType}/${featureFileName}`;
console.log(`Running command: ${command}`);

execSync(command, { stdio: 'inherit' });
