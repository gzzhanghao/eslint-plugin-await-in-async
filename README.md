# eslint-plugin-await-in-async

This rule disallows using await expression outside async functions. See [microsoft/TypeScript#38847](https://github.com/microsoft/TypeScript/issues/38847).

## Usage

```bash
npm i -D eslint-plugin-await-in-async
```

```js
module.exports = {
  rules: {
    'await-in-async/await-in-async': 2
  }
}
```
