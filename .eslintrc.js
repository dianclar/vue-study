module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'no-empty': 'warn',
  },
}
