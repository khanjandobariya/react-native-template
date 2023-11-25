module.exports = {
  root: true,
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    semi: 'off',
    'comma-dangle': 'off',
    'no-console': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    curly: 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^react', '^@?\\w']]
      }
    ],
    'import/no-cycle': [
      'error',
      {
        maxDepth: 1
      }
    ],
    'prefer-destructuring': 'error',
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',
    'react/no-array-index-key': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-native/sort-styles': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-unused-styles': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  settings: {
    'import/ignore': ['react-native']
  },
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'import'
  ]
}
