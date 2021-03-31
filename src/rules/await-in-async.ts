import {
  ASTUtils,
  TSESTree,
} from '@typescript-eslint/experimental-utils';

import { RuleListener } from '@typescript-eslint/experimental-utils/dist/ts-eslint';

import { createRule } from '../util';

export interface AwaitInAsyncOptions {
  topLevelAwait?: 'allow' | 'never'
}

export default createRule<[AwaitInAsyncOptions], string, RuleListener>({
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
      topLevelAwait: `Top-level await is not allowed`,
    },
    schema: [
      {
        type: 'object',
        properties: {
          topLevelAwait: {
            type: 'string',
            enum: ['allow', 'never'],
            default: 'never',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [
    {
      topLevelAwait: 'never',
    },
  ],
  create(context) {
    const options = context.options[0] || {}
    return {
      AwaitExpression(node: TSESTree.AwaitExpression) {
        const fn = findContextFunction(node.parent);
        if (!fn) {
          if (options.topLevelAwait !== 'allow') {
            context.report({ messageId: 'topLevelAwait', node });
          }
          return
        }
        if (!fn.async) {
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
