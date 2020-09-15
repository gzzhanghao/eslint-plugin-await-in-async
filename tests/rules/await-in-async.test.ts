import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import rule from '../../src/rules/await-in-async'

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('await-in-async', rule, {
  valid: [
    {
      code: `
async function foo() {
  await bar;
}
      `,
    },
    {
      code: `
const foo = async () => {
  await bar;
}
      `,
    },
    {
      code: `
function foo() {
  async function bar() {
    await baz;
  }
}
      `,
    }
  ],
  invalid: [
    {
      code: `await bar`,
      errors: [
        {
          messageId: 'missingAsync',
          data: { type: 'string' },
          line: 1,
          column: 1,
        }
      ],
    },
    {
      code: `
function foo() {
  await bar;
}
      `,
      errors: [
        {
          messageId: 'missingAsync',
          data: { type: 'string' },
          line: 3,
          column: 3,
        }
      ],
    },
    {
      code: `
async function foo() {
  function bar() {
    await baz;
  }
}
      `,
      errors: [
        {
          messageId: 'missingAsync',
          data: { type: 'string' },
          line: 4,
          column: 5,
        }
      ],
    },
    {
      code: `
async function foo() {
  const bar = () => {
    await baz;
  }
}
      `,
      errors: [
        {
          messageId: 'missingAsync',
          data: { type: 'string' },
          line: 4,
          column: 5,
        }
      ],
    },
  ],
});
