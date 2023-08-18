module.exports = require('@backstage/cli/config/eslint-factory')(__dirname, {
  plugins: ['backstage-material-ui-path-imports'],
  rules: {
    'backstage-material-ui-path-imports/material-ui-path-imports': 'error',
  },
});
