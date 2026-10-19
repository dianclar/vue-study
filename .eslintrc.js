module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-empty': 'warn',
  },
  globals: {
    //
  },
  overrides: [
    {
      files: ['*.vue'],
    },
  ],
}
