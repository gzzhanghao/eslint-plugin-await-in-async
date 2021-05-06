import awaitInAsync from './rules/await-in-async';

export = {
  rules: {
    'await-in-async': awaitInAsync,
  },
  configs: {
    base: {
      plugins: [
        'await-in-async',
      ],
      rules: {
        'await-in-async/await-in-async': 2,
      },
    },
  },
};
