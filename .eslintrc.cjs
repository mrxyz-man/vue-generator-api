/* eslint-env node */
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue-pug/strongly-recommended',
    'airbnb-base',
  ],
  plugins: [
    'vue',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'no-console': isProduction ? 'error' : 'warn',
    'no-debugger': isProduction ? 'error' : 'warn',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 4,
      },
    }],
    'vue/v-slot-style': ['error', {
      atComponent: 'v-slot',
      default: 'v-slot',
      named: 'longform',
    }],
    'vue/html-quotes': ['error', 'double', { avoidEscape: false }],
  },
};
