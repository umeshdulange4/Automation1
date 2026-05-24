const reporter = require('cucumber-html-reporter');
const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true, // This automatically opens the report in your browser
};
reporter.generate(options);
