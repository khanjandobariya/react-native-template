const customRules = require('./eslint-rules')
const tsEslint = require('@typescript-eslint/eslint-plugin')

module.exports = [
  {
    ignores: [
      'node_modules/',
      'android/**',
      'ios/**',
      '*.config.js',
      'index.js',
      'plopfile.js'
    ]
  },
  {
    files: ['**/*.{ts,tsx}', 'src/i18n/locales/**/*.json'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      react: require('eslint-plugin-react'),
      'react-native': require('eslint-plugin-react-native'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      '@typescript-eslint': tsEslint,
      prettier: require('eslint-plugin-prettier'),
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
      import: require('eslint-plugin-import'),
      'custom-rules': customRules
    },
    rules: {
      'no-console': 'error',
      curly: 'off',
      'prefer-destructuring': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lodash',
              importNames: ['default'],
              message:
                'Default lodash import is not allowed. Use named imports: import { isEmpty, find } from "lodash"'
            }
          ]
        }
      ],
      // 🔹 Custom naming convention rules
      'custom-rules/camelcase-dynamic-data': [
        'error',
        {
          variableNames: ['myStyles', 'styles', 'RS'],
          ignoreKeywords: ['Reducer']
        }
      ],
      'custom-rules/constant-static-data': 'error',
      'custom-rules/boolean-is-prefix': 'error',
      'custom-rules/exported-variables-capitalized': 'error',
      'custom-rules/function-spacing': 'error',
      'custom-rules/function-naming-conventions': [
        'error',
        {
          excludePaths: [
            'src/utils/Utility.ts',
            'src/utils/Responsive.ts',
            'src/i18n/i18n.ts',
            '.styles.ts'
          ]
        }
      ],
      'custom-rules/ignore-typescript-for-styles': [
        'error',
        {
          variableNames: ['myStyles', 'styles', 'RS']
        }
      ],
      'custom-rules/prefer-lodash-methods': 'error',
      'custom-rules/asset-files-snake-case': [
        'error',
        {
          assetPaths: [
            'src/assets/gifs',
            'src/assets/icons',
            'src/assets/images'
          ]
        }
      ],
      'custom-rules/prefer-typed-translation': 'error',
      'custom-rules/no-duplicate-i18n-strings': [
        'error',
        {
          localePaths: ['src/i18n/locales']
        }
      ],

      // 🔹 TypeScript essentials
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': ['error', {prefer: 'type-imports'}],

      // 🔹 Reasonable strictness (avoid over-complexity) - disabled in favor of custom rule
      '@typescript-eslint/no-explicit-any': 'off',
      'custom-rules/no-explicit-any-except-styles': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',

      // 🚫 Disabled noisy rules (to reduce dev pain)
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

      // 🔹 Code style & formatting
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/newline-after-import': 'error',
      'import/no-cycle': ['error', {maxDepth: 1}],
      'react/no-array-index-key': 'warn',

      // 🔹 React Native specific
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/sort-styles': 'off',
      'react-native/no-raw-text': 'off',
      'react-native/no-unused-styles': 'off',

      // 🔹 React rules
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // Disable default typedef rule in favor of custom one that ignores style variables
      '@typescript-eslint/typedef': 'off',
      'custom-rules/custom-typedef-ignore-styles': [
        'error',
        {
          variableNames: ['myStyles', 'styles', 'RS'],
          variableDeclaration: false,
          arrowParameter: true,
          propertyDeclaration: false,
          memberVariableDeclaration: true
        }
      ],

      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/require-default-props': ['off']
    },
    settings: {
      'import/ignore': ['react-native'],
      react: {
        version: 'detect'
      }
    }
  }
]
