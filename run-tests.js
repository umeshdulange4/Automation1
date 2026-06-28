const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const cucumberConfig = 'cucumber.js';

let profile = 'default';
let extraArgs = [];

if (args.length > 0 && !args[0].startsWith('--')) {
  profile = args[0];
  extraArgs = args.slice(1);
} else {
  extraArgs = args;
}

const profileArg = profile === 'default' ? '' : `--profile ${profile}`;
const extraArgString = extraArgs.join(' ');
const command = `npx cucumber-js --config ${cucumberConfig} ${profileArg} ${extraArgString}`.trim();
let exitCode = 0;

console.log(`Running Cucumber with profile: ${profile}`);
try {
  execSync(command, { stdio: 'inherit' });
  console.log('Cucumber finished.');
} catch (error) {
  exitCode = error.status || 1;
  console.warn(`Cucumber exited with code ${exitCode}. Report generation should still run from hooks.`);
}

process.exit(exitCode);
