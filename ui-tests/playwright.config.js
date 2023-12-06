var baseConfig = require('@jupyterlab/galata/lib/playwright-config');

module.exports = {
  ...baseConfig,
  expect: {
    toMatchSnapshot: { threshold: 0.33 },
  },
  webServer: {
    command: 'jlpm start',
    url: 'http://localhost:8888/lab',
    reuseExistingServer: !process.env.CI
  },
  preserveOutput: 'failures-only',
  retries: 0,
  timeout: 600000,
};
