const reporter = require('cucumber-html-reporter');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const jsonFile = 'reports/cucumber-report.json';
const output = 'reports/cucumber-report.html';
const reportPath = path.resolve(output);
const fileUrl = 'file:///' + reportPath.replace(/\\/g, '/');

function parseCucumberSummary(jsonPath) {
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Cucumber JSON report not found: ${jsonPath}`);
  }

  const reportData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const summary = {
    features: reportData.length,
    passedFeatures: 0,
    failedFeatures: 0,
    totalSteps: 0,
    passedSteps: 0,
    failedSteps: 0,
    skippedSteps: 0,
    pendingSteps: 0,
    undefinedSteps: 0,
    ambiguousSteps: 0,
  };

  reportData.forEach((feature) => {
    let hasFailedStep = false;

    if (Array.isArray(feature.elements)) {
      feature.elements.forEach((scenario) => {
        if (Array.isArray(scenario.steps)) {
          scenario.steps.forEach((step) => {
            const status = step.result?.status;
            summary.totalSteps += 1;

            switch (status) {
              case 'passed':
                summary.passedSteps += 1;
                break;
              case 'failed':
                summary.failedSteps += 1;
                hasFailedStep = true;
                break;
              case 'skipped':
                summary.skippedSteps += 1;
                break;
              case 'pending':
                summary.pendingSteps += 1;
                break;
              case 'undefined':
                summary.undefinedSteps += 1;
                break;
              case 'ambiguous':
                summary.ambiguousSteps += 1;
                break;
              default:
                break;
            }
          });
        }
      });
    }

    if (hasFailedStep) {
      summary.failedFeatures += 1;
    } else {
      summary.passedFeatures += 1;
    }
  });

  return summary;
}

function openChromeSync(fileUrl) {
  const chromeExecutables = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];

  let opened = false;
  for (const chrome of chromeExecutables) {
    if (fs.existsSync(chrome)) {
      try {
        execSync(`"${chrome}" --new-window "${fileUrl}"`, { stdio: 'ignore' });
        console.log('✓ Report opened in Chrome: ' + reportPath);
        opened = true;
        break;
      } catch (error) {
        console.error('Error opening Chrome:', error.message || error);
      }
    }
  }

  if (!opened) {
    try {
      execSync(`start "" "chrome" "${fileUrl}"`, { shell: 'cmd.exe', stdio: 'ignore' });
      console.log('✓ Report opened in Chrome via shell command: ' + reportPath);
      opened = true;
    } catch (error) {
      try {
        execSync(`start "" "${fileUrl}"`, { shell: 'cmd.exe', stdio: 'ignore' });
        console.log('✓ Report opened in default browser: ' + reportPath);
      } catch (fallbackError) {
        console.error('Error opening report:', fallbackError.message || fallbackError);
      }
    }
  }
}

function generateReport({ openBrowser = true } = {}) {
  const summary = parseCucumberSummary(jsonFile);

  const options = {
    theme: 'bootstrap',
    jsonFile,
    output,
    reportSuiteAsScenarios: false,
    scenarioTimestamp: true,
    launchReport: false,
    brandTitle: 'Automation1 Cucumber Dashboard',
    name: 'Automation1 Test Report',
    metadata: {
      'Total Features': summary.features,
      'Features Passed': `${summary.passedFeatures}/${summary.features}`,
      'Features Failed': summary.failedFeatures,
      'Total Steps': summary.totalSteps,
      'Steps Passed': `${summary.passedSteps}/${summary.totalSteps}`,
      'Steps Failed': summary.failedSteps,
      'Skipped Steps': summary.skippedSteps,
      'Platform': process.platform,
    },
    failedSummaryReport: true,
  };

  reporter.generate(options);

  if (!fs.existsSync(reportPath)) {
    throw new Error('Report file not found: ' + reportPath);
  }

  if (openBrowser) {
    openChromeSync(fileUrl);
  }
}

if (require.main === module) {
  try {
    generateReport({ openBrowser: true });
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }
}

module.exports = { generateReport };
