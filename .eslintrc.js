const rules = {
  'import/prefer-default-export': 0,
  '@typescript-eslint/no-use-before-define': 0,
};

module.exports = {
  overrides: [
    {
      files: [
        '**/*.js',
      ],
      extends: [
        'eslint-config-airbnb-base',
      ],
      rules,
    },
    {
      files: [
        '**/*.ts',
      ],
      extends: [
        'eslint-config-airbnb-typescript/base',
      ],
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      rules,
    },
  ],
};
