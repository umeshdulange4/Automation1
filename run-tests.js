const { execSync } = require('child_process');
const path = require('path');

const profile = process.argv[2] || 'default';
const cucumberConfig = 'cucumber.js';
const reportScript = 'report.js';

const profileArg = profile === 'default' ? '' : `--profile ${profile}`;
const command = `npx cucumber-js --config ${cucumberConfig} ${profileArg}`.trim();
let exitCode = 0;

console.log(`Running Cucumber with profile: ${profile}`);
try {
  execSync(command, { stdio: 'inherit' });
  console.log('Cucumber finished.');
} catch (error) {
  exitCode = error.status || 1;
  console.warn(`Cucumber exited with code ${exitCode}. Generating report anyway...`);
}

try {
  console.log('Generating HTML report...');
  execSync(`node ${reportScript}`, { stdio: 'inherit' });
  console.log('Report generation complete.');
} catch (reportError) {
  console.error('Report generation failed:', reportError.message || reportError);
  process.exit(reportError.status || 1);
}

process.exit(exitCode);
