# Custom ESLint Rules for Alfa IELTS React Native App

This directory contains custom ESLint rules that enforce specific variable naming conventions for the Alfa IELTS React Native application.

**Note**: These custom naming convention rules are **only applied to TypeScript files** (`.ts`, `.tsx`). JavaScript files (`.js`, `.jsx`) are excluded from these rules.

**React Components**: React component names (PascalCase variables exported as default) are automatically excluded from these naming convention rules.

## Rules Overview

### 1. `camelcase-dynamic-data`

**Purpose**: Enforces camelCase naming for variables that store dynamic data.

**Rule**: Variables storing dynamic data should be in camelCase.

**Examples**:

```typescript
// ✅ Correct
let userInput = ''
let currentUser = null
let isLoading = false
let apiResponse = {}

// ❌ Incorrect
let USER_INPUT = ''
let CURRENT_USER = null
let IS_LOADING = false
```

### 2. `constant-static-data`

**Purpose**: Enforces CAPITAL_SNAKE_CASE naming for variables that store static data.

**Rule**: Variables storing static data should be in CAPITAL_SNAKE_CASE.

**Examples**:

```typescript
// ✅ Correct
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3
const DEFAULT_TIMEOUT = 5000
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr']

// ❌ Incorrect
const apiBaseUrl = 'https://api.example.com'
const maxRetryAttempts = 3
const defaultTimeout = 5000
```

### 3. `boolean-is-prefix`

**Purpose**: Enforces 'is' prefix for boolean variables.

**Rule**: Boolean variables should start with 'is' prefix.

**Examples**:

```typescript
// ✅ Correct
const isUserLoggedIn = true
const isDataLoaded = false
const isFormValid = userInput.length > 0
const isNetworkAvailable = navigator.onLine

// ❌ Incorrect
const userLoggedIn = true
const dataLoaded = false
const formValid = userInput.length > 0
const networkAvailable = navigator.onLine
```

## How It Works

### Static vs Dynamic Data Detection

The rules automatically detect whether a variable stores static or dynamic data:

**Static Data** (requires CAPITAL_SNAKE_CASE):

- `const` declarations with primitive literals (strings, numbers, booleans)
- `const` declarations with object/array literals containing only primitive values
- `const` declarations with template literals containing no expressions

**Dynamic Data** (requires camelCase):

- `let` or `var` declarations (regardless of initial value)
- `const` declarations with function calls, new expressions, or other dynamic operations
- Variables that will change during runtime

**Boolean Variables** (requires 'is' prefix):

- Variables initialized with boolean literals (`true`/`false`)
- Variables with boolean expressions (comparisons, logical operations)
- Variables with function calls that return boolean values
- Variables with member expressions that return boolean values

## What's Excluded

The following are automatically excluded from all custom naming convention rules:

- **React Components**: PascalCase variables that are exported as default (e.g., `const LoginScreen = () => { ... }`)
- **Function Declarations**: Variables assigned to function expressions
- **Arrow Functions with JSX**: Variables assigned to arrow functions that return JSX elements

## Configuration

The rules are automatically enabled in the project's ESLint v9+ configuration (`eslint.config.js`) and are **only applied to TypeScript files**:

```javascript
// ESLint v9+ Flat Config Format
module.exports = [
  {
    // Global ignores
    ignores: ['node_modules/', 'android/**', 'ios/**', '__tests__/**', '*.config.js']
  },
  {
    // TypeScript files configuration
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'custom-rules': customRules
    },
    rules: {
      'custom-rules/camelcase-dynamic-data': 'error',
      'custom-rules/constant-static-data': 'error',
      'custom-rules/boolean-is-prefix': 'error'
      // ... other rules
    }
  },
  {
    // JavaScript files configuration (custom rules disabled)
    files: ['**/*.{js,jsx}'],
    rules: {
      // Custom naming rules are NOT applied to JavaScript files
      // ... other standard rules
    }
  }
]
```

## Usage

### Running ESLint

```bash
# Check all files
npm run linter

# Check specific file
npx eslint src/your-file.ts

# Auto-fix issues (where possible)
npx eslint src/your-file.ts --fix
```

### IDE Integration

The rules will automatically work in your IDE if you have the ESLint extension installed. You'll see:

- Red squiggly lines under incorrect variable names
- Error messages explaining the correct naming convention
- Quick fixes (where applicable)

## Examples

### Complete Example

```typescript
// ✅ CORRECT NAMING

// Static data in CAPITAL_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3
const DEFAULT_CONFIG = {
  theme: 'dark',
  notifications: true
}

// Dynamic data in camelCase
let userInput = ''
let currentUser = null
let isLoading = false
let apiResponse = {}

// Boolean variables with 'is' prefix
const isUserLoggedIn = true
const isDataLoaded = false
const isFormValid = userInput.length > 0
const isNetworkAvailable = navigator.onLine
```

## Troubleshooting

### Common Issues

1. **"Variable storing static data should be in CAPITAL_SNAKE_CASE"**
   - Solution: Change the variable name to CAPITAL_SNAKE_CASE
   - Example: `apiBaseUrl` → `API_BASE_URL`

2. **"Variable storing dynamic data should be in camelCase"**
   - Solution: Change the variable name to camelCase
   - Example: `USER_INPUT` → `userInput`

3. **"Boolean variable should start with 'is' prefix"**
   - Solution: Add 'is' prefix to the variable name
   - Example: `userLoggedIn` → `isUserLoggedIn`

### Rule Conflicts

If you have conflicting rules, the boolean rule takes precedence over the static/dynamic data rules. This means:

- Boolean variables will always be checked for the 'is' prefix
- Non-boolean variables will be checked for static/dynamic naming conventions

## Contributing

To modify or add new rules:

1. Edit the rules in `custom-rules.js`
2. Update the configuration in `eslint.config.js`
3. Test with your TypeScript files
4. Update this documentation

## Files

- `custom-rules.js` - Main rule definitions
- `index.js` - Plugin entry point
- `package.json` - Plugin metadata
- `README.md` - This documentation
- `../eslint.config.js` - ESLint v9+ configuration (TypeScript and JavaScript)

## TypeScript Only

These custom naming convention rules are specifically designed for TypeScript files and will not be applied to JavaScript files. This ensures that:

1. **TypeScript files** get the full benefit of the custom naming conventions
2. **JavaScript files** remain unaffected and can use any naming convention
3. **Migration** from JavaScript to TypeScript is easier as existing JS files won't trigger errors
