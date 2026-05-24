/**
 * Cucumber Configuration File
 * Defines multiple test profiles for different test runs
 */

module.exports = {
  default: {
    paths: ['tests/features/'],
    require: ['tests/steps/*.js', 'tests/support/*.js'],
    format: [
      'progress-bar',
      'summary',
      ['html', 'reports/cucumber-report.html'],
      ['json', 'reports/cucumber-report.json']
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  },

  // Smoke tests profile
  smoke: {
    paths: ['tests/features/'],
    require: ['tests/steps/*.js', 'tests/support/*.js'],
    tags: '@smoke',
    format: [
      'progress-bar',
      'summary',
      ['html', 'reports/smoke-report.html'],
      ['json', 'reports/smoke-report.json']
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  },

  // Regression tests profile
  regression: {
    paths: ['tests/features/'],
    require: ['tests/steps/*.js', 'tests/support/*.js'],
    tags: '@regression',
    format: [
      'progress-bar',
      'summary',
      ['html', 'reports/regression-report.html'],
      ['json', 'reports/regression-report.json']
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  },

  // CI/CD pipeline profile (parallel execution)
  ci: {
    paths: ['tests/features/'],
    require: ['tests/steps/*.js', 'tests/support/*.js'],
    format: [
      'progress-bar',
      'summary',
      ['html', 'reports/ci-report.html'],
      ['json', 'reports/ci-report.json']
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    dryRun: false,
    failFast: false
  },

  // Debug profile (verbose output)
  debug: {
    paths: ['tests/features/'],
    require: ['tests/steps/*.js', 'tests/support/*.js'],
    format: [
      'progress-bar',
      'summary',
      '@pretty',
      ['html', 'reports/debug-report.html'],
      ['json', 'reports/debug-report.json']
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    strict: true,
    dryRun: false
  }
};
