import { RuleTester } from "eslint";
import pathImportsRule from './pathImportsRule';

const parserResolver = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  parser: parserResolver,
});

ruleTester.run('path-imports-rule', pathImportsRule, {
  valid: [
    {
      code: `import Typography from '@material-ui/core/Typography';`,
    },
    {
      code: `import Box from '@material-ui/core/Box'`,
    },
  ],
  invalid: [
    {
      code: `import { Box, Typography } from '@material-ui/core';`,
      errors: [{ messageId: 'topLevelImport' }],
      output: `import Box from '@material-ui/core/Box';
               import Typography from '@material-ui/core/Typography';`,
    },
    {
      code: `import Box from '@material-ui/core';`,
      errors: [{ messageId: 'topLevelImport' }],
      output: `import Box from '@material-ui/core/Box`,
    },
    {
      code: `import { Box } from '@material-ui/core';`,
      errors: [{ messageId: 'topLevelImport' }],
      output: `import Box from '@material-ui/core/Box`,
    },
    {
      code: `import {
              Box,
              DialogActions,
              DialogContent,
              DialogTitle,
              Grid,
              makeStyles,
            } from '@material-ui/core';`,
      errors: [{ messageId: 'topLevelImport' }],
    },
    {
      code: `import { TabIndicator } from '@material-ui/core/Tabs/TabIndicator';`,
      errors: [{ messageId: 'thirdLevelImport' }],
    },
  ],
});
