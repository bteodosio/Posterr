module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'prettier'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    '@typescript-eslint/no-explicit-any': 0,
    'import/no-duplicates': 'off',
    'no-useless-constructor': 'off',
    'camelcase': 'off',
    'no-unused-vars': 'off',
    'multiline-ternary': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: 'packages/server/*/tsconfig.json'
      }
    }
  }
}
