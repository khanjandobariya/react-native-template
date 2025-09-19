# VS Code Settings Documentation

This document explains all VS Code settings configured for the Alfa IELTS React Native project, organized by category.

## Auto-save Configuration

| Rule                                 | Purpose                                              |
| ------------------------------------ | ---------------------------------------------------- |
| `"files.autoSave": "afterDelay"`     | Automatically saves files after a specified delay    |
| `"files.autoSaveDelay": 1000`        | Sets auto-save delay to 1000ms (1 second)            |
| `"files.autoSaveWhenNoErrors": true` | Only auto-saves when there are no errors in the file |

## File Associations

| Rule                                                   | Purpose                                                   |
| ------------------------------------------------------ | --------------------------------------------------------- |
| `"files.associations": { "*.tsx": "typescriptreact" }` | Associates .tsx files with TypeScript React language mode |
| `"files.associations": { "*.ts": "typescript" }`       | Associates .ts files with TypeScript language mode        |
| `"files.associations": { "*.jsx": "javascriptreact" }` | Associates .jsx files with JavaScript React language mode |
| `"files.associations": { "*.js": "javascript" }`       | Associates .js files with JavaScript language mode        |

## Editor Settings

| Rule                                                                   | Purpose                                             |
| ---------------------------------------------------------------------- | --------------------------------------------------- |
| `"editor.formatOnSave": true`                                          | Automatically formats code when saving files        |
| `"editor.formatOnPaste": true`                                         | Automatically formats code when pasting             |
| `"editor.formatOnType": false`                                         | Disables formatting while typing                    |
| `"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`   | Runs ESLint fixes on save                           |
| `"editor.codeActionsOnSave": { "source.organizeImports": "explicit" }` | Organizes imports on save                           |
| `"editor.defaultFormatter": "esbenp.prettier-vscode"`                  | Sets Prettier as the default formatter              |
| `"editor.tabSize": 2`                                                  | Sets tab size to 2 spaces                           |
| `"editor.insertSpaces": true`                                          | Uses spaces instead of tabs                         |
| `"editor.detectIndentation": false`                                    | Disables automatic indentation detection            |
| `"editor.rulers": [100, 120]`                                          | Shows vertical rulers at 100 and 120 characters     |
| `"editor.wordWrap": "on"`                                              | Enables word wrapping                               |
| `"editor.minimap.enabled": true`                                       | Shows the minimap on the right side                 |
| `"editor.bracketPairColorization.enabled": true`                       | Enables bracket pair colorization                   |
| `"editor.guides.bracketPairs": true`                                   | Shows bracket pair guides                           |
| `"editor.suggestSelection": "first"`                                   | Selects the first suggestion by default             |
| `"editor.acceptSuggestionOnCommitCharacter": false`                    | Disables accepting suggestions on commit characters |
| `"editor.acceptSuggestionOnEnter": "on"`                               | Accepts suggestions when pressing Enter             |
| `"editor.tabCompletion": "on"`                                         | Enables tab completion                              |
| `"editor.wordBasedSuggestions": "off"`                                 | Disables word-based suggestions                     |

## TypeScript Specific Settings

| Rule                                                             | Purpose                                     |
| ---------------------------------------------------------------- | ------------------------------------------- |
| `"typescript.suggest.autoImports": true`                         | Enables automatic import suggestions        |
| `"typescript.updateImportsOnFileMove.enabled": "always"`         | Updates imports when files are moved        |
| `"typescript.preferences.includePackageJsonAutoImports": "auto"` | Automatically includes package.json imports |
| `"typescript.suggest.completeFunctionCalls": true`               | Completes function calls with parameters    |
| `"typescript.inlayHints.parameterNames.enabled": "literals"`     | Shows parameter names in function calls     |
| `"typescript.inlayHints.variableTypes.enabled": true`            | Shows variable types inline                 |
| `"typescript.inlayHints.functionLikeReturnTypes.enabled": true`  | Shows function return types inline          |

## JavaScript/React Specific Settings

| Rule                                                            | Purpose                                             |
| --------------------------------------------------------------- | --------------------------------------------------- |
| `"javascript.suggest.autoImports": true`                        | Enables automatic import suggestions for JavaScript |
| `"javascript.updateImportsOnFileMove.enabled": "always"`        | Updates imports when JavaScript files are moved     |
| `"javascript.suggest.completeFunctionCalls": true`              | Completes JavaScript function calls with parameters |
| `"javascript.inlayHints.parameterNames.enabled": "literals"`    | Shows parameter names in JavaScript function calls  |
| `"javascript.inlayHints.variableTypes.enabled": true`           | Shows variable types inline in JavaScript           |
| `"javascript.inlayHints.functionLikeReturnTypes.enabled": true` | Shows function return types inline in JavaScript    |

## ESLint Configuration

| Rule                                                                                    | Purpose                                              |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]` | Validates JavaScript, JSX, TypeScript, and TSX files |
| `"eslint.format.enable": true`                                                          | Enables ESLint formatting                            |
| `"eslint.codeActionsOnSave.mode": "all"`                                                | Runs all ESLint code actions on save                 |
| `"eslint.run": "onSave"`                                                                | Runs ESLint when saving files                        |

## Prettier Configuration

| Rule                                   | Purpose                                                      |
| -------------------------------------- | ------------------------------------------------------------ |
| `"prettier.requireConfig": true`       | Requires a Prettier configuration file                       |
| `"prettier.useEditorConfig": false`    | Disables EditorConfig integration                            |
| `"prettier.semi": false`               | Disables semicolons                                          |
| `"prettier.singleQuote": true`         | Uses single quotes instead of double quotes                  |
| `"prettier.trailingComma": "none"`     | Disables trailing commas                                     |
| `"prettier.tabWidth": 2`               | Sets Prettier tab width to 2 spaces                          |
| `"prettier.printWidth": 100`           | Sets line length to 100 characters                           |
| `"prettier.bracketSpacing": false`     | Disables spaces inside object brackets                       |
| `"prettier.jsxBracketSameLine": false` | Places JSX closing bracket on new line                       |
| `"prettier.arrowParens": "always"`     | Always includes parentheses around arrow function parameters |

## File Explorer Settings

| Rule                                  | Purpose                                                |
| ------------------------------------- | ------------------------------------------------------ |
| `"explorer.confirmDelete": true`      | Shows confirmation dialog when deleting files          |
| `"explorer.confirmDragAndDrop": true` | Shows confirmation dialog for drag and drop operations |

## Search Settings

| Rule                                                 | Purpose                                        |
| ---------------------------------------------------- | ---------------------------------------------- |
| `"search.exclude": { "**/node_modules": true }`      | Excludes node_modules from search              |
| `"search.exclude": { "**/bower_components": true }`  | Excludes bower_components from search          |
| `"search.exclude": { "**/android/build": true }`     | Excludes Android build folders from search     |
| `"search.exclude": { "**/android/app/build": true }` | Excludes Android app build folders from search |
| `"search.exclude": { "**/ios/build": true }`         | Excludes iOS build folders from search         |
| `"search.exclude": { "**/ios/DerivedData": true }`   | Excludes iOS DerivedData from search           |
| `"search.exclude": { "**/.git": true }`              | Excludes .git folder from search               |
| `"search.exclude": { "**/.DS_Store": true }`         | Excludes .DS_Store files from search           |
| `"search.exclude": { "**/Thumbs.db": true }`         | Excludes Thumbs.db files from search           |
| `"search.exclude": { "**/yarn.lock": true }`         | Excludes yarn.lock from search                 |
| `"search.exclude": { "**/package-lock.json": true }` | Excludes package-lock.json from search         |
| `"search.exclude": { "**/pnpm-lock.yaml": true }`    | Excludes pnpm-lock.yaml from search            |

## File Watcher Exclusions

| Rule                                                           | Purpose                                               |
| -------------------------------------------------------------- | ----------------------------------------------------- |
| `"files.watcherExclude": { "**/node_modules/**": true }`       | Excludes node_modules from file watching              |
| `"files.watcherExclude": { "**/android/build/**": true }`      | Excludes Android build folders from file watching     |
| `"files.watcherExclude": { "**/android/app/build/**": true }`  | Excludes Android app build folders from file watching |
| `"files.watcherExclude": { "**/ios/build/**": true }`          | Excludes iOS build folders from file watching         |
| `"files.watcherExclude": { "**/ios/DerivedData/**": true }`    | Excludes iOS DerivedData from file watching           |
| `"files.watcherExclude": { "**/.git/objects/**": true }`       | Excludes git objects from file watching               |
| `"files.watcherExclude": { "**/.git/subtree-cache/**": true }` | Excludes git subtree cache from file watching         |
| `"files.watcherExclude": { "**/yarn.lock": true }`             | Excludes yarn.lock from file watching                 |
| `"files.watcherExclude": { "**/package-lock.json": true }`     | Excludes package-lock.json from file watching         |
| `"files.watcherExclude": { "**/pnpm-lock.yaml": true }`        | Excludes pnpm-lock.yaml from file watching            |

## File Explorer Exclusions

| Rule                                                | Purpose                                            |
| --------------------------------------------------- | -------------------------------------------------- |
| `"files.exclude": { "**/node_modules": true }`      | Hides node_modules from file explorer              |
| `"files.exclude": { "**/android/build": true }`     | Hides Android build folders from file explorer     |
| `"files.exclude": { "**/android/app/build": true }` | Hides Android app build folders from file explorer |
| `"files.exclude": { "**/ios/build": true }`         | Hides iOS build folders from file explorer         |
| `"files.exclude": { "**/ios/DerivedData": true }`   | Hides iOS DerivedData from file explorer           |
| `"files.exclude": { "**/.git": true }`              | Hides .git folder from file explorer               |
| `"files.exclude": { "**/.DS_Store": true }`         | Hides .DS_Store files from file explorer           |
| `"files.exclude": { "**/Thumbs.db": true }`         | Hides Thumbs.db files from file explorer           |

## Emmet Configuration

| Rule                                                            | Purpose                                   |
| --------------------------------------------------------------- | ----------------------------------------- |
| `"emmet.includeLanguages": { "typescript": "typescriptreact" }` | Enables Emmet for TypeScript files        |
| `"emmet.includeLanguages": { "javascript": "javascriptreact" }` | Enables Emmet for JavaScript files        |
| `"emmet.triggerExpansionOnTab": true`                           | Triggers Emmet expansion with Tab key     |
| `"emmet.showExpandedAbbreviation": "always"`                    | Always shows expanded Emmet abbreviations |

## React Native Specific Settings

| Rule                                                     | Purpose                                   |
| -------------------------------------------------------- | ----------------------------------------- |
| `"react-native-tools.showUserTips": false`               | Disables React Native user tips           |
| `"react-native-tools.logLevel": "Info"`                  | Sets React Native tools log level to Info |
| `"react-native-tools.projectRoot": "${workspaceFolder}"` | Sets project root to workspace folder     |
| `"react-native-tools.packager.port": 8081`               | Sets Metro bundler port to 8081           |

## IntelliSense Settings

| Rule                                                                  | Purpose                                               |
| --------------------------------------------------------------------- | ----------------------------------------------------- |
| `"typescript.suggest.includeAutomaticOptionalChainCompletions": true` | Includes optional chaining in TypeScript suggestions  |
| `"typescript.suggest.includeCompletionsForImportStatements": true`    | Includes import completions in TypeScript suggestions |
| `"javascript.suggest.includeAutomaticOptionalChainCompletions": true` | Includes optional chaining in JavaScript suggestions  |
| `"javascript.suggest.includeCompletionsForImportStatements": true`    | Includes import completions in JavaScript suggestions |

## Bracket Pair Colorization

| Rule                                                                        | Purpose                                                  |
| --------------------------------------------------------------------------- | -------------------------------------------------------- |
| `"editor.bracketPairColorization.independentColorPoolPerBracketType": true` | Uses independent color pools for different bracket types |

## Auto-close Tags

| Rule                                 | Purpose                                       |
| ------------------------------------ | --------------------------------------------- |
| `"html.autoClosingTags": true`       | Automatically closes HTML tags                |
| `"typescript.autoClosingTags": true` | Automatically closes tags in TypeScript files |
| `"javascript.autoClosingTags": true` | Automatically closes tags in JavaScript files |

## Snippet Suggestions

| Rule                                  | Purpose                                      |
| ------------------------------------- | -------------------------------------------- |
| `"editor.snippetSuggestions": "top"`  | Shows snippets at the top of suggestion list |
| `"editor.suggest.showSnippets": true` | Enables snippet suggestions                  |

## Breadcrumbs

| Rule                                     | Purpose                              |
| ---------------------------------------- | ------------------------------------ |
| `"breadcrumbs.enabled": true`            | Enables breadcrumb navigation        |
| `"breadcrumbs.showFiles": true`          | Shows files in breadcrumbs           |
| `"breadcrumbs.showModules": true`        | Shows modules in breadcrumbs         |
| `"breadcrumbs.showClasses": true`        | Shows classes in breadcrumbs         |
| `"breadcrumbs.showMethods": true`        | Shows methods in breadcrumbs         |
| `"breadcrumbs.showFunctions": true`      | Shows functions in breadcrumbs       |
| `"breadcrumbs.showConstructors": true`   | Shows constructors in breadcrumbs    |
| `"breadcrumbs.showFields": true`         | Shows fields in breadcrumbs          |
| `"breadcrumbs.showVariables": true`      | Shows variables in breadcrumbs       |
| `"breadcrumbs.showConstants": true`      | Shows constants in breadcrumbs       |
| `"breadcrumbs.showEnums": true`          | Shows enums in breadcrumbs           |
| `"breadcrumbs.showEnumMembers": true`    | Shows enum members in breadcrumbs    |
| `"breadcrumbs.showEvents": true`         | Shows events in breadcrumbs          |
| `"breadcrumbs.showOperators": true`      | Shows operators in breadcrumbs       |
| `"breadcrumbs.showTypeParameters": true` | Shows type parameters in breadcrumbs |

## Problems Panel

| Rule                                   | Purpose                               |
| -------------------------------------- | ------------------------------------- |
| `"problems.decorations.enabled": true` | Enables problem decorations in editor |
| `"problems.showCurrentInStatus": true` | Shows current problems in status bar  |

## Workbench Settings

| Rule                                                   | Purpose                               |
| ------------------------------------------------------ | ------------------------------------- |
| `"workbench.editor.enablePreview": false`              | Disables editor preview mode          |
| `"workbench.editor.enablePreviewFromQuickOpen": false` | Disables preview mode from quick open |
| `"workbench.editor.showTabs": "multiple"`              | Shows multiple tabs                   |
| `"workbench.editor.tabSizing": "shrink"`               | Shrinks tabs to fit more              |
| `"workbench.editor.wrapTabs": true`                    | Wraps tabs to multiple rows           |
| `"workbench.startupEditor": "newUntitledFile"`         | Opens new untitled file on startup    |
| `"workbench.editor.restoreViewState": true`            | Restores editor view state            |
| `"workbench.editor.limit.enabled": true`               | Enables editor limit                  |
| `"workbench.editor.limit.value": 10`                   | Limits to 10 open editors             |
| `"workbench.editor.limit.perEditorGroup": true`        | Applies limit per editor group        |

## Color Theme and Icon Theme

| Rule                                      | Purpose                           |
| ----------------------------------------- | --------------------------------- |
| `"workbench.colorTheme": "Default Dark+"` | Sets color theme to Default Dark+ |
| `"workbench.iconTheme": "vs-seti"`        | Sets icon theme to vs-seti        |

## Language Specific Settings

### TypeScript

| Rule                                                                                | Purpose                                   |
| ----------------------------------------------------------------------------------- | ----------------------------------------- |
| `"[typescript].editor.defaultFormatter": "esbenp.prettier-vscode"`                  | Sets Prettier as formatter for TypeScript |
| `"[typescript].editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`   | Runs ESLint fixes on save for TypeScript  |
| `"[typescript].editor.codeActionsOnSave": { "source.organizeImports": "explicit" }` | Organizes imports on save for TypeScript  |

### TypeScript React

| Rule                                                                                     | Purpose                            |
| ---------------------------------------------------------------------------------------- | ---------------------------------- |
| `"[typescriptreact].editor.defaultFormatter": "esbenp.prettier-vscode"`                  | Sets Prettier as formatter for TSX |
| `"[typescriptreact].editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`   | Runs ESLint fixes on save for TSX  |
| `"[typescriptreact].editor.codeActionsOnSave": { "source.organizeImports": "explicit" }` | Organizes imports on save for TSX  |

### JavaScript

| Rule                                                                                | Purpose                                   |
| ----------------------------------------------------------------------------------- | ----------------------------------------- |
| `"[javascript].editor.defaultFormatter": "esbenp.prettier-vscode"`                  | Sets Prettier as formatter for JavaScript |
| `"[javascript].editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`   | Runs ESLint fixes on save for JavaScript  |
| `"[javascript].editor.codeActionsOnSave": { "source.organizeImports": "explicit" }` | Organizes imports on save for JavaScript  |

### JavaScript React

| Rule                                                                                     | Purpose                            |
| ---------------------------------------------------------------------------------------- | ---------------------------------- |
| `"[javascriptreact].editor.defaultFormatter": "esbenp.prettier-vscode"`                  | Sets Prettier as formatter for JSX |
| `"[javascriptreact].editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`   | Runs ESLint fixes on save for JSX  |
| `"[javascriptreact].editor.codeActionsOnSave": { "source.organizeImports": "explicit" }` | Organizes imports on save for JSX  |

### JSON

| Rule                                                          | Purpose                              |
| ------------------------------------------------------------- | ------------------------------------ |
| `"[json].editor.defaultFormatter": "esbenp.prettier-vscode"`  | Sets Prettier as formatter for JSON  |
| `"[jsonc].editor.defaultFormatter": "esbenp.prettier-vscode"` | Sets Prettier as formatter for JSONC |

### Markdown

| Rule                                                             | Purpose                                               |
| ---------------------------------------------------------------- | ----------------------------------------------------- |
| `"[markdown].editor.defaultFormatter": "esbenp.prettier-vscode"` | Sets Prettier as formatter for Markdown               |
| `"[markdown].editor.wordWrap": "on"`                             | Enables word wrap for Markdown                        |
| `"[markdown].editor.quickSuggestions": { "comments": "off" }`    | Disables quick suggestions in Markdown comments       |
| `"[markdown].editor.quickSuggestions": { "strings": "off" }`     | Disables quick suggestions in Markdown strings        |
| `"[markdown].editor.quickSuggestions": { "other": "off" }`       | Disables quick suggestions in other Markdown contexts |

---

## Summary

This VS Code configuration is optimized for React Native development with TypeScript, providing:

- **Automatic code formatting** with Prettier
- **Linting and error checking** with ESLint
- **Enhanced IntelliSense** for TypeScript and JavaScript
- **React Native specific tools** integration
- **Performance optimizations** by excluding build folders
- **Developer experience improvements** with breadcrumbs, bracket colorization, and auto-save
- **Consistent code style** across the entire project

The settings ensure a productive development environment with automatic code quality checks, consistent formatting, and excellent tooling support for React Native development.
