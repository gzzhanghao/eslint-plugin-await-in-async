# eslint-plugin-await-in-async

This rule disallows using await expression outside async functions. See [microsoft/TypeScript#38847](https://github.com/microsoft/TypeScript/issues/38847).

## Usage

```bash
npm i -D eslint-plugin-await-in-async
```

```js
module.exports = {
  rules: {
    'await-in-async/await-in-async': 'error'
  }
}
```

## Rule Details

Examples of __incorrect__ code for this rule:

```js
/* eslint await-in-async/await-in-async: "error" */

await foo;

function foo() {
  await bar;
}

async function foo() {
  const bar = () => {
    await baz;
  }
}
```

Examples of __correct__ code for this rule:

```js
/* eslint await-in-async/await-in-async: "error" */

async function foo() {
  await bar;
}

function foo() {
  const bar = async () => {
    await baz;
  }
}
```

## Options

This rule has an object option for exceptions:

- `topLevelAwait: 'allow'` allows top-level await

### topLevelAwait

Examples of additional correct code for this rule with the `{ "topLevelAwait": "allow" }` option:

```js
/* eslint await-in-async/await-in-async: ["error", { "topLevelAwait": "allow" }] */
await foo;
```
