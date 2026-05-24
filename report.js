const reporter = require('cucumber-html-reporter');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
};

reporter.generate(options);

// Open the report in Chrome
const reportPath = path.resolve('reports/cucumber-report.html');
const fileUrl = 'file:///' + reportPath.replace(/\\/g, '/');

// Verify file exists
if (!fs.existsSync(reportPath)) {
  console.error('✗ Report file not found: ' + reportPath);
  process.exit(1);
}

const chromeExecutables = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];

let opened = false;
for (const chrome of chromeExecutables) {
  if (fs.existsSync(chrome)) {
    exec(`"${chrome}" "${fileUrl}"`, (error) => {
      if (error) {
        console.error('Error opening Chrome:', error);
      }
    });
    console.log('✓ Report opened in Chrome: ' + reportPath);
    opened = true;
    break;
  }
}

if (!opened) {
  // Fallback: use Windows start command
  exec(`start ${fileUrl}`, (error) => {
    if (error) {
      console.error('Error opening report:', error);
    }
  });
  console.log('✓ Report opened in default browser: ' + reportPath);
}
