import { Rule } from "eslint";

const pathImportsRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    messages: {
      topLevelImport: 'Top level imports for Material UI are not allowed',
      thirdLevelImport:
        '3rd level or deeper imports for Material UI are not allowed',
    },
    schema: [], // no options
  },
  create: context => ({
    ImportDeclaration: node => {
      // Return if empty import
      if (node.specifiers.length === 0) return;
      // Return if empty source value
      if (!node.source.value) return
      // Return if source value not a string
      if (typeof node.source.value !== 'string') return
      // Return if import is not `@material-ui/`
      if (!node.source.value.startsWith('@material-ui/')) return;
      // Return if proper import eg. `import Box from '@material-ui/core/Box'`
      if (
        node.specifiers.length === 1 &&
        node.source.value?.split('/').length === 3
      )
        return;

      // Report 3rd level or deeper imports
      if (
        node.specifiers.length === 1 &&
        node.source.value.split('/').length > 3
      ) {
        context.report({
          node,
          messageId: 'thirdLevelImport',
        });
        return;
      }

      // Report all other imports
      context.report({
        node,
        messageId: 'topLevelImport',
        fix: fixer => {
          const replacements: String[] = [];

          const specifiers = node.specifiers.filter(
            s => s.type === "ImportSpecifier",
          );

          for (const specifier of specifiers) {
            const replacement = `import ${specifier.local.name} from '${node.source.value}/${specifier.local.name}';`;
            replacements.push(replacement);
          }

          const result = fixer.replaceText(node, replacements.join('\n'));

          return result;
        },
      });
    },
  }),
};

export default pathImportsRule;
