import {
  ASTUtils,
  TSESTree,
} from '@typescript-eslint/experimental-utils';

import { createRule } from '../util';

export default createRule({
  name: 'await-in-async',
  meta: {
    type: 'problem',
    docs: {
      description: 'Requires await expression to be inside an async function',
      category: 'Possible Errors',
      recommended: false,
      requiresTypeChecking: false,
    },
    messages: {
      missingAsync: `Can not use keyword 'await' outside an async function`,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      AwaitExpression(node: TSESTree.AwaitExpression) {
        const fn = findContextFunction(node.parent);
        if (!fn?.async) {
          context.report({ messageId: 'missingAsync', node });
        }
      },
    };
  },
});

function findContextFunction(node?: TSESTree.Node) {
  let current = node;
  while (current) {
    if (ASTUtils.isFunction(current)) {
      return current;
    }
    current = current.parent;
  }
  return null;
}
