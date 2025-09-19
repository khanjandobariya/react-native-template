/**
 * Custom ESLint rules for variable naming conventions
 *
 * Rules:
 * 1. Variables storing dynamic data should be in camelCase
 * 2. Variables storing static data should be in CAPITAL_SNAKE_CASE
 * 3. Boolean variables should start with 'is' prefix
 */

module.exports = {
  rules: {
    'camelcase-dynamic-data': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce camelCase for variables storing dynamic data',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: null,
        schema: [
          {
            type: 'object',
            properties: {
              variableNames: {
                type: 'array',
                items: {
                  type: 'string'
                },
                default: []
              }
            },
            additionalProperties: false
          }
        ]
      },
      create(context) {
        const options = context.options[0] || {}
        const ignoredVariableNames = options.variableNames || []

        function isIgnoredVariable(variableName) {
          return ignoredVariableNames.includes(variableName)
        }

        return {
          VariableDeclarator(node) {
            if (node.id.type === 'Identifier') {
              const variableName = node.id.name

              // Skip ignored variables
              if (isIgnoredVariable(variableName)) {
                return
              }

              // Skip function declarations and React components
              if (node.init && node.init.type === 'FunctionExpression') {
                return
              }

              // Skip React components (arrow functions that return JSX)
              if (
                node.init &&
                node.init.type === 'ArrowFunctionExpression' &&
                node.init.body &&
                (node.init.body.type === 'JSXElement' ||
                  (node.init.body.type === 'BlockStatement' &&
                    node.init.body.body.some(
                      (stmt) =>
                        stmt.type === 'ReturnStatement' &&
                        stmt.argument &&
                        stmt.argument.type === 'JSXElement'
                    )))
              ) {
                return
              }

              // Skip variables that are likely React component names
              // (PascalCase names that are exported as default or are arrow functions)
              if (
                isPascalCase(variableName) &&
                (isDefaultExport(node, context) || isReactComponent(node))
              ) {
                return
              }

              // Skip if it's used as a JSX component
              if (isUsedAsJSXComponent(node, context)) {
                return
              }

              // Skip if it's a React Context (createContext call)
              if (isReactContext(node)) {
                return
              }

              // Skip variables that are exported (module exports)
              if (isDefaultExport(node, context) || isNamedExport(node, context)) {
                return
              }

              // Check if variable stores dynamic data (not a constant)
              const isDynamicData = !isStaticData(node.init, node.parent)

              if (isDynamicData && !isCamelCase(variableName)) {
                context.report({
                  node: node.id,
                  message: `Variable '${variableName}' storing dynamic data should be in camelCase`
                })
              }
            }
          }
        }
      }
    },

    'constant-static-data': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce CAPITAL_SNAKE_CASE for variables storing static data',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          VariableDeclarator(node) {
            if (node.id.type === 'Identifier') {
              const variableName = node.id.name

              // Skip boolean variables - they have their own rule
              if (isBooleanVariable(node.init, context, node)) {
                return
              }

              // Skip React component names and exported PascalCase variables (modules/objects)
              if (
                isPascalCase(variableName) &&
                (isDefaultExport(node, context) || isNamedExport(node, context))
              ) {
                return
              }

              // Skip PascalCase variables that are likely module exports/objects
              // This covers cases where export detection might not work perfectly
              if (
                isPascalCase(variableName) &&
                node.init &&
                node.init.type === 'ObjectExpression'
              ) {
                return
              }

              // Check if variable stores static data
              const isStatic = isStaticData(node.init, node.parent)

              if (isStatic && !isCapitalSnakeCase(variableName)) {
                context.report({
                  node: node.id,
                  message: `Variable '${variableName}' storing static data should be in CAPITAL_SNAKE_CASE`
                })
              }
            }
          }
        }
      }
    },

    'boolean-is-prefix': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce boolean variables to start with "is" prefix',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          VariableDeclarator(node) {
            if (node.id.type === 'Identifier') {
              const variableName = node.id.name

              // Skip React component names
              if (isPascalCase(variableName) && isDefaultExport(node, context)) {
                return
              }

              // Check if variable is boolean
              const isBoolean = isBooleanVariable(node.init, context, node)

              if (isBoolean && !variableName.startsWith('is')) {
                context.report({
                  node: node.id,
                  message: `Boolean variable '${variableName}' should start with 'is' prefix`
                })
              }
            }
          }
        }
      }
    },

    'exported-variables-capitalized': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce exported variables to be capitalized (PascalCase)',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        return {
          VariableDeclarator(node) {
            if (node.id.type === 'Identifier') {
              const variableName = node.id.name

              // Skip if already PascalCase
              if (isPascalCase(variableName)) {
                return
              }

              // Skip if it's a regular function (not a React component)
              if (isRegularFunction(node, context)) {
                return
              }

              // Skip boolean variables - they should follow boolean naming rules (camelCase with 'is' prefix)
              if (isBooleanVariable(node.init, context, node)) {
                return
              }

              // Check if variable is exported (default export or named export)
              const isExported = isDefaultExport(node, context) || isNamedExport(node, context)

              if (isExported && !isPascalCase(variableName)) {
                context.report({
                  node: node.id,
                  message: `Exported variable '${variableName}' should be capitalized (PascalCase)`
                })
              }
            }
          }
        }
      }
    },

    'no-explicit-any-except-styles': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Auto-replace explicit any types with anyType and add import',
          category: 'TypeScript',
          recommended: true
        },
        fixable: 'code',
        schema: []
      },
      create(context) {
        const sourceCode = context.getSourceCode()

        function hasAnyTypeImport() {
          const ast = sourceCode.ast
          if (!ast || !ast.body) return false

          return ast.body.some((node) => {
            if (node.type === 'ImportDeclaration') {
              return node.specifiers.some(
                (spec) => spec.type === 'ImportSpecifier' && spec.imported.name === 'anyType'
              )
            }
            return false
          })
        }

        function addAnyTypeImport(fixer) {
          const ast = sourceCode.ast
          if (!ast || !ast.body) return null

          // Find existing import from commonTypes
          const existingImport = ast.body.find(
            (node) =>
              node.type === 'ImportDeclaration' &&
              (node.source.value.includes('types/commonTypes') ||
                node.source.value.includes('./types/commonTypes') ||
                node.source.value.includes('../types/commonTypes') ||
                node.source.value.includes('../../types/commonTypes') ||
                node.source.value.includes('../../../types/commonTypes'))
          )

          if (existingImport) {
            // Add anyType to existing import
            const lastSpecifier = existingImport.specifiers[existingImport.specifiers.length - 1]
            if (lastSpecifier) {
              return fixer.insertTextAfter(lastSpecifier, ', anyType')
            }
          } else {
            // Determine the correct import path based on file location
            const filename = context.getFilename()
            let importPath = '../types/commonTypes'

            // Calculate relative path based on file depth
            const pathSegments = filename
              .split('/')
              .filter((segment) => segment !== '' && segment !== '.')
            const srcIndex = pathSegments.findIndex((segment) => segment === 'src')

            if (srcIndex !== -1) {
              const depthFromSrc = pathSegments.length - srcIndex - 2 // -2 for 'src' and filename
              if (depthFromSrc === 0) {
                importPath = './types/commonTypes'
              } else if (depthFromSrc === 1) {
                importPath = '../types/commonTypes'
              } else {
                importPath = '../'.repeat(depthFromSrc) + 'types/commonTypes'
              }
            }

            // Add new import at the top (after other imports if they exist)
            const imports = ast.body.filter((node) => node.type === 'ImportDeclaration')
            const firstNonImport = ast.body.find((node) => node.type !== 'ImportDeclaration')

            if (imports.length > 0) {
              const lastImport = imports[imports.length - 1]
              return fixer.insertTextAfter(
                lastImport,
                `\nimport type { anyType } from '${importPath}'`
              )
            } else if (firstNonImport) {
              return fixer.insertTextBefore(
                firstNonImport,
                `import type { anyType } from '${importPath}'\n\n`
              )
            }
          }
          return null
        }

        return {
          TSAnyKeyword(node) {
            // Check if this any type is part of a variable declaration
            let current = node.parent
            let isStylesVariable = false

            while (current) {
              if (
                current.type === 'VariableDeclarator' &&
                current.id &&
                current.id.type === 'Identifier'
              ) {
                // If the variable is named 'styles', allow the any type
                if (current.id.name === 'styles') {
                  isStylesVariable = true
                }
                break
              }
              current = current.parent
            }

            // Skip styles variables
            if (isStylesVariable) {
              return
            }

            // For all other cases, replace with anyType
            context.report({
              node,
              message: 'Replace "any" with "anyType" for better type safety.',
              fix(fixer) {
                const fixes = [fixer.replaceText(node, 'anyType')]

                // Add import if it doesn't exist
                if (!hasAnyTypeImport()) {
                  const importFix = addAnyTypeImport(fixer)
                  if (importFix) {
                    fixes.push(importFix)
                  }
                }

                return fixes
              }
            })
          }
        }
      }
    },

    'ignore-typescript-for-styles': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Ignore TypeScript type checking for specified variable names like myStyles, styles',
          category: 'TypeScript',
          recommended: true
        },
        fixable: null,
        schema: [
          {
            type: 'object',
            properties: {
              variableNames: {
                type: 'array',
                items: {
                  type: 'string'
                },
                default: ['myStyles', 'styles']
              }
            },
            additionalProperties: false
          }
        ]
      },
      create(context) {
        const options = context.options[0] || {}
        const variableNames = options.variableNames || ['myStyles', 'styles']

        function isIgnoredVariable(variableName) {
          return variableNames.includes(variableName)
        }

        return {
          // This rule doesn't report anything itself, but serves as a marker
          // It will be used by the custom typedef rule to identify ignored variables
          VariableDeclarator(node) {
            if (node.id && node.id.type === 'Identifier' && isIgnoredVariable(node.id.name)) {
              // Just mark this as processed, don't report anything
              return
            }
          }
        }
      }
    },

    'custom-typedef-ignore-styles': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Custom typedef rule that ignores style variables',
          category: 'TypeScript',
          recommended: true
        },
        fixable: null,
        schema: [
          {
            type: 'object',
            properties: {
              variableNames: {
                type: 'array',
                items: {
                  type: 'string'
                },
                default: ['myStyles', 'styles']
              },
              variableDeclaration: {
                type: 'boolean',
                default: true
              },
              arrowParameter: {
                type: 'boolean',
                default: true
              },
              propertyDeclaration: {
                type: 'boolean',
                default: true
              },
              memberVariableDeclaration: {
                type: 'boolean',
                default: true
              }
            },
            additionalProperties: false
          }
        ]
      },
      create(context) {
        const options = context.options[0] || {}
        const variableNames = options.variableNames || ['myStyles', 'styles']
        const config = {
          variableDeclaration: options.variableDeclaration !== false,
          arrowParameter: options.arrowParameter !== false,
          propertyDeclaration: options.propertyDeclaration !== false,
          memberVariableDeclaration: options.memberVariableDeclaration !== false
        }

        function isIgnoredVariable(variableName) {
          // Check exact variable names
          if (variableNames.includes(variableName)) {
            return true
          }

          // Check if it's a custom hook (starts with 'use' and is camelCase)
          if (/^use[A-Z][a-zA-Z0-9]*$/.test(variableName)) {
            return true
          }

          return false
        }

        function isInsideStyleContext(node) {
          // Check if we're inside a StyleSheet.create call or similar style-related context
          let current = node
          while (current) {
            // Check for StyleSheet.create
            if (
              current.type === 'CallExpression' &&
              current.callee &&
              current.callee.type === 'MemberExpression' &&
              current.callee.object &&
              current.callee.object.name === 'StyleSheet' &&
              current.callee.property &&
              current.callee.property.name === 'create'
            ) {
              return true
            }

            // Check if we're inside a function/variable that is in the ignored list
            if (
              current.type === 'VariableDeclarator' &&
              current.id &&
              current.id.type === 'Identifier' &&
              isIgnoredVariable(current.id.name)
            ) {
              return true
            }

            current = current.parent
          }
          return false
        }

        function checkTypeAnnotation(node, nodeType) {
          if (!config[nodeType]) {
            return
          }

          // Skip ignored style variables
          if (node.id && node.id.type === 'Identifier' && isIgnoredVariable(node.id.name)) {
            return
          }

          // Skip if we're inside a style context (StyleSheet.create or ignored variable function)
          if (isInsideStyleContext(node)) {
            return
          }

          // Check if type annotation is missing
          if (!node.id.typeAnnotation) {
            context.report({
              node: node.id,
              message: `Missing return type on ${nodeType.replace(/([A-Z])/g, ' $1').toLowerCase()}.`
            })
          }
        }

        function isReactComponent(node) {
          // Check if this is a React component (arrow function or function that returns JSX)
          if (node.init) {
            if (
              node.init.type === 'ArrowFunctionExpression' ||
              node.init.type === 'FunctionExpression'
            ) {
              // Check if it returns JSX
              if (node.init.body && node.init.body.type === 'JSXElement') {
                return true
              }
              if (
                node.init.body &&
                node.init.body.type === 'BlockStatement' &&
                node.init.body.body
              ) {
                const hasJSXReturn = node.init.body.body.some(
                  (stmt) =>
                    stmt.type === 'ReturnStatement' &&
                    stmt.argument &&
                    stmt.argument.type === 'JSXElement'
                )
                return hasJSXReturn
              }
            }
          }
          return false
        }

        return {
          VariableDeclarator(node) {
            if (node.id && node.id.type === 'Identifier') {
              // Skip ignored variables completely
              if (isIgnoredVariable(node.id.name)) {
                return
              }

              // Skip React components
              if (isReactComponent(node)) {
                return
              }

              // Skip PascalCase variables (likely components or exported objects)
              if (/^[A-Z][a-zA-Z0-9]*$/.test(node.id.name)) {
                return
              }

              checkTypeAnnotation(node, 'variableDeclaration')
            }
          },

          ArrowFunctionExpression(node) {
            if (node.params) {
              node.params.forEach((param) => {
                if (param.type === 'Identifier' && !param.typeAnnotation) {
                  checkTypeAnnotation({id: param}, 'arrowParameter')
                }
              })
            }
          },

          Property(node) {
            if (node.key && node.key.type === 'Identifier') {
              // Skip if we're inside a style context
              if (isInsideStyleContext(node)) {
                return
              }

              // Skip if the parent object already has a type annotation
              let current = node.parent
              while (current) {
                if (
                  current.type === 'VariableDeclarator' &&
                  current.id &&
                  current.id.typeAnnotation
                ) {
                  // Parent variable has type annotation, skip property checking
                  return
                }
                if (
                  current.type === 'ObjectExpression' &&
                  current.parent &&
                  current.parent.type === 'VariableDeclarator' &&
                  current.parent.id &&
                  current.parent.id.typeAnnotation
                ) {
                  // Object has type annotation, skip property checking
                  return
                }
                current = current.parent
              }

              checkTypeAnnotation({id: node.key}, 'propertyDeclaration')
            }
          },

          PropertyDefinition(node) {
            if (node.key && node.key.type === 'Identifier') {
              checkTypeAnnotation({id: node.key}, 'memberVariableDeclaration')
            }
          }
        }
      }
    },

    'function-spacing': {
      meta: {
        type: 'layout',
        docs: {
          description: 'Enforce blank lines between function declarations',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: 'whitespace',
        schema: []
      },
      create(context) {
        const sourceCode = context.getSourceCode()

        function checkFunctionSpacing(node) {
          // Find the parent block statement (function body)
          let blockStatement = node.parent
          while (blockStatement && blockStatement.type !== 'BlockStatement') {
            blockStatement = blockStatement.parent
          }

          if (!blockStatement || !blockStatement.body) return

          const statements = blockStatement.body
          let currentIndex = -1

          // Find the current statement index
          for (let i = 0; i < statements.length; i++) {
            const stmt = statements[i]
            if (stmt.type === 'VariableDeclaration' && stmt.declarations.includes(node)) {
              currentIndex = i
              break
            }
          }

          if (currentIndex <= 0) return // First statement or not found

          const previousStatement = statements[currentIndex - 1]
          const currentStatement = statements[currentIndex]

          // Check if both statements are function declarations
          const isPreviousFunction =
            previousStatement.type === 'VariableDeclaration' &&
            previousStatement.declarations.length === 1 &&
            previousStatement.declarations[0].init &&
            (previousStatement.declarations[0].init.type === 'ArrowFunctionExpression' ||
              previousStatement.declarations[0].init.type === 'FunctionExpression')

          const isCurrentFunction =
            currentStatement.type === 'VariableDeclaration' &&
            currentStatement.declarations.length === 1 &&
            node.init &&
            (node.init.type === 'ArrowFunctionExpression' ||
              node.init.type === 'FunctionExpression')

          if (isPreviousFunction && isCurrentFunction) {
            // Get the line numbers
            const previousEndLine = sourceCode.getLastToken(previousStatement).loc.end.line
            const currentStartLine = sourceCode.getFirstToken(currentStatement).loc.start.line
            const linesBetween = currentStartLine - previousEndLine - 1

            // If there's no blank line between functions, report and fix
            if (linesBetween === 0) {
              context.report({
                node: currentStatement,
                message: 'Expected blank line between function declarations',
                fix(fixer) {
                  // Insert a newline before the current statement
                  const tokenBefore = sourceCode.getTokenBefore(currentStatement)
                  return fixer.insertTextAfter(tokenBefore, '\n')
                }
              })
            }
          }
        }

        return {
          VariableDeclarator(node) {
            // Only check function declarations
            if (
              node.init &&
              (node.init.type === 'ArrowFunctionExpression' ||
                node.init.type === 'FunctionExpression')
            ) {
              checkFunctionSpacing(node)
            }
          }
        }
      }
    },

    'function-naming-conventions': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce naming conventions for render functions and onPress handlers',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        function isRenderFunction(node) {
          // Check if function returns JSX
          if (!node.init) return false

          let functionBody = null

          // Handle arrow functions
          if (node.init.type === 'ArrowFunctionExpression') {
            functionBody = node.init.body

            // Direct JSX return (no braces)
            if (functionBody.type === 'JSXElement' || functionBody.type === 'JSXFragment') {
              return true
            }

            // Block statement with return
            if (functionBody.type === 'BlockStatement') {
              const returnStatements = functionBody.body.filter(
                (stmt) => stmt.type === 'ReturnStatement'
              )
              return returnStatements.some(
                (stmt) =>
                  stmt.argument &&
                  (stmt.argument.type === 'JSXElement' || stmt.argument.type === 'JSXFragment')
              )
            }
          }

          // Handle function expressions
          if (node.init.type === 'FunctionExpression') {
            functionBody = node.init.body
            if (functionBody && functionBody.type === 'BlockStatement') {
              const returnStatements = functionBody.body.filter(
                (stmt) => stmt.type === 'ReturnStatement'
              )
              return returnStatements.some(
                (stmt) =>
                  stmt.argument &&
                  (stmt.argument.type === 'JSXElement' || stmt.argument.type === 'JSXFragment')
              )
            }
          }

          return false
        }

        function isOnPressHandler(node) {
          if (!node.init) return false

          const functionName = node.id.name

          // Check if function is used as event handler in JSX
          const sourceCode = context.getSourceCode()
          const fileText = sourceCode.getText()

          // Look for onPress={functionName} pattern in the file
          const onPressUsagePattern = new RegExp(
            `onPress\\s*=\\s*\\{\\s*${functionName}\\s*\\}`,
            'g'
          )
          if (onPressUsagePattern.test(fileText)) {
            return true
          }

          // Check function body for press/navigation-related functionality
          let functionBody = null

          if (node.init.type === 'ArrowFunctionExpression') {
            functionBody = node.init.body
          } else if (node.init.type === 'FunctionExpression') {
            functionBody = node.init.body
          }

          if (!functionBody) return false

          // For arrow functions with direct expression
          if (functionBody.type !== 'BlockStatement') {
            return false
          }

          // Check if function contains press/navigation-related code
          const functionText = sourceCode.getText(node.init)

          // Look for common event handler patterns
          const onPressPatterns = [
            /onPress/i,
            /\.press\(/i,
            /handlePress/i,
            /navigation\./i,
            /navigate\(/i,
            /router\./i,
            /push\(/i,
            /pop\(/i,
            /goBack\(/i,
            /Alert\./i,
            /showAlert/i,
            /openModal/i,
            /closeModal/i,
            /toggleModal/i,
            /setVisible/i,
            /setState/i,
            /dispatch/i
          ]

          return onPressPatterns.some((pattern) => pattern.test(functionText))
        }

        function isCamelCase(str) {
          return /^[a-z][a-zA-Z0-9]*$/.test(str)
        }

        return {
          VariableDeclarator(node) {
            if (node.id && node.id.type === 'Identifier') {
              const functionName = node.id.name

              // Skip if it's not a function
              if (
                !node.init ||
                (node.init.type !== 'ArrowFunctionExpression' &&
                  node.init.type !== 'FunctionExpression')
              ) {
                return
              }

              // Skip main React component (PascalCase and exported as default)
              if (/^[A-Z][a-zA-Z0-9]*$/.test(functionName)) {
                // Check if this is exported as default (main component)
                const sourceCode = context.getSourceCode()
                const isMainComponent = sourceCode.ast.body.some(
                  (stmt) =>
                    stmt.type === 'ExportDefaultDeclaration' &&
                    stmt.declaration &&
                    stmt.declaration.name === functionName
                )
                if (isMainComponent) {
                  return // Skip main components
                }
                // Don't skip other PascalCase functions - they should follow render naming
              }

              // Skip custom React hooks (starts with 'use' and is camelCase)
              if (/^use[A-Z][a-zA-Z0-9]*$/.test(functionName)) {
                return
              }

              // Check render function naming
              if (isRenderFunction(node)) {
                if (!functionName.startsWith('render')) {
                  context.report({
                    node: node.id,
                    message: `Function '${functionName}' returns JSX and should start with 'render' (e.g., renderContent, renderItem)`
                  })
                } else if (!isCamelCase(functionName)) {
                  context.report({
                    node: node.id,
                    message: `Render function '${functionName}' should use camelCase naming`
                  })
                }
              }

              // Check onPress handler naming
              else if (isOnPressHandler(node)) {
                if (!functionName.startsWith('on')) {
                  context.report({
                    node: node.id,
                    message: `Function '${functionName}' handles press/navigation functionality and should start with 'on' (e.g., onNavigate, onPress, onLogin, onBack)`
                  })
                } else if (!isCamelCase(functionName)) {
                  context.report({
                    node: node.id,
                    message: `Event handler '${functionName}' should use camelCase naming`
                  })
                }
              }
            }
          }
        }
      }
    }
  }
}

// Helper functions
function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str)
}

function isCapitalSnakeCase(str) {
  return /^[A-Z][A-Z0-9_]*$/.test(str)
}

function isPascalCase(str) {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str)
}

function isDefaultExport(node, context) {
  // Check if this variable is exported as default
  let current = node.parent
  while (current) {
    if (current.type === 'ExportDefaultDeclaration') {
      return true
    }
    current = current.parent
  }

  // Check if this variable is referenced in a default export elsewhere in the file
  const sourceCode = context.getSourceCode()
  if (sourceCode && sourceCode.ast && sourceCode.ast.body) {
    return sourceCode.ast.body.some(
      (stmt) =>
        stmt.type === 'ExportDefaultDeclaration' &&
        stmt.declaration &&
        stmt.declaration.name === node.id.name
    )
  }

  return false
}

function isReactComponent(node) {
  // Check if this is a React component (arrow function or function expression)
  if (node.init) {
    // Arrow function
    if (node.init.type === 'ArrowFunctionExpression') {
      return true
    }
    // Function expression
    if (node.init.type === 'FunctionExpression') {
      return true
    }
  }
  return false
}

function isNamedExport(node, context) {
  // Check if this variable is exported as a named export
  const sourceCode = context.getSourceCode()
  if (sourceCode && sourceCode.ast && sourceCode.ast.body) {
    return sourceCode.ast.body.some((stmt) => {
      if (stmt.type === 'ExportNamedDeclaration') {
        // Check if this variable is in the export specifiers
        if (stmt.specifiers) {
          return stmt.specifiers.some(
            (spec) => spec.type === 'ExportSpecifier' && spec.local.name === node.id.name
          )
        }
        // Check if the declaration itself is exported
        if (stmt.declaration && stmt.declaration.type === 'VariableDeclaration') {
          return stmt.declaration.declarations.some((decl) => decl.id.name === node.id.name)
        }
      }
      return false
    })
  }

  // Also check if this node is directly part of an export declaration
  let current = node.parent
  while (current) {
    if (current.type === 'ExportNamedDeclaration') {
      return true
    }
    current = current.parent
  }

  return false
}

function isReactContext(node) {
  // Check if this is a React Context created with createContext
  if (node.init && node.init.type === 'CallExpression') {
    if (node.init.callee && node.init.callee.name === 'createContext') {
      return true
    }
  }
  return false
}

function isUsedAsJSXComponent(node, context) {
  // Check if this variable is used as a JSX component in the file
  const sourceCode = context.getSourceCode()
  if (!sourceCode || !sourceCode.ast || !sourceCode.ast.body) {
    return false
  }

  const variableName = node.id.name

  // Search through all JSX elements in the file
  function findJSXElements(astNode) {
    const jsxElements = []
    const visited = new WeakSet()

    function traverse(node) {
      if (!node || typeof node !== 'object' || visited.has(node)) return
      visited.add(node)

      if (node.type === 'JSXElement' && node.openingElement && node.openingElement.name) {
        jsxElements.push(node.openingElement.name)
      }

      // Only traverse specific AST node properties to avoid circular references
      const traversableKeys = [
        'body',
        'children',
        'expression',
        'argument',
        'left',
        'right',
        'consequent',
        'alternate',
        'declarations',
        'init'
      ]

      for (const key of traversableKeys) {
        const value = node[key]
        if (Array.isArray(value)) {
          value.forEach((child) => traverse(child))
        } else if (value && typeof value === 'object') {
          traverse(value)
        }
      }
    }

    traverse(astNode)
    return jsxElements
  }

  const jsxElements = findJSXElements(sourceCode.ast)

  // Check if any JSX element uses this variable name
  return jsxElements.some((jsxName) => {
    if (jsxName.type === 'JSXIdentifier') {
      return jsxName.name === variableName
    }
    // Handle JSXMemberExpression like Stack.Navigator, AppStateContext.Provider
    if (
      jsxName.type === 'JSXMemberExpression' &&
      jsxName.object &&
      jsxName.object.type === 'JSXIdentifier'
    ) {
      return jsxName.object.name === variableName
    }
    return false
  })
}

function isRegularFunction(node, context) {
  // Check if this variable is used as a JSX component
  if (isUsedAsJSXComponent(node, context)) {
    return false // It's used as a JSX component, should be capitalized
  }

  // Check if this is a regular function (not a React component)
  if (node.init) {
    // Arrow function
    if (node.init.type === 'ArrowFunctionExpression') {
      // Check if it returns JSX (React component)
      if (node.init.body && node.init.body.type === 'JSXElement') {
        return false // It's a React component, not a regular function
      }
      // Check if it's a block statement that returns JSX
      if (node.init.body && node.init.body.type === 'BlockStatement') {
        const hasJSXReturn = node.init.body.body.some(
          (stmt) =>
            stmt.type === 'ReturnStatement' && stmt.argument && stmt.argument.type === 'JSXElement'
        )
        if (hasJSXReturn) {
          return false // It's a React component, not a regular function
        }
      }
      return true // It's a regular function
    }
    // Function expression
    if (node.init.type === 'FunctionExpression') {
      return true // Regular function expression
    }
  }
  return false
}

function isStaticData(init, parent) {
  if (!init) return false

  // Only const declarations can be truly static
  if (!parent || parent.kind !== 'const') {
    return false
  }

  // Primitive literals are considered static
  if (init.type === 'Literal') {
    return true
  }

  // Object/Array literals with only primitive values or static references are considered static
  if (init.type === 'ObjectExpression') {
    return init.properties.every((prop) => {
      if (!prop.value) return false
      // Literal values are static
      if (prop.value.type === 'Literal') return true
      // References to other static variables (Identifiers) are also considered static
      if (prop.value.type === 'Identifier') return true
      return false
    })
  }

  if (init.type === 'ArrayExpression') {
    return init.elements.every((element) => element && element.type === 'Literal')
  }

  // Template literals with only static content
  if (init.type === 'TemplateLiteral') {
    return init.expressions.length === 0
  }

  // Function calls, new expressions, and other dynamic operations are not static
  if (
    init.type === 'CallExpression' ||
    init.type === 'NewExpression' ||
    init.type === 'MemberExpression' ||
    init.type === 'Identifier'
  ) {
    return false
  }

  return false
}

function isBooleanVariable(init, context, node) {
  if (!init) return false

  // Check TypeScript type annotation for boolean
  if (
    node &&
    node.id &&
    node.id.typeAnnotation &&
    node.id.typeAnnotation.typeAnnotation &&
    node.id.typeAnnotation.typeAnnotation.type === 'TSBooleanKeyword'
  ) {
    return true
  }

  // Direct boolean literals
  if (init.type === 'Literal' && typeof init.value === 'boolean') {
    return true
  }

  // Boolean expressions
  if (init.type === 'UnaryExpression' && init.operator === '!') {
    return true
  }

  // Logical expressions
  if (init.type === 'LogicalExpression' && (init.operator === '&&' || init.operator === '||')) {
    return true
  }

  // Comparison expressions
  if (
    init.type === 'BinaryExpression' &&
    ['==', '===', '!=', '!==', '<', '>', '<=', '>='].includes(init.operator)
  ) {
    return true
  }

  // Conditional (ternary) expressions that return boolean
  // Only consider it boolean if both consequent and alternate are boolean literals
  if (init.type === 'ConditionalExpression') {
    const consequentIsBoolean =
      init.consequent.type === 'Literal' && typeof init.consequent.value === 'boolean'
    const alternateIsBoolean =
      init.alternate.type === 'Literal' && typeof init.alternate.value === 'boolean'
    return consequentIsBoolean && alternateIsBoolean
  }

  // Check if it's a function call that returns boolean
  if (init.type === 'CallExpression') {
    const functionName = init.callee.name
    if (functionName && isBooleanFunction(functionName)) {
      return true
    }
  }

  // Member expressions that likely return boolean (like navigator.onLine)
  if (init.type === 'MemberExpression') {
    const propertyName = init.property.name
    if (propertyName && isBooleanProperty(propertyName)) {
      return true
    }
  }

  return false
}

function isBooleanFunction(functionName) {
  const booleanFunctions = [
    'includes',
    'startsWith',
    'endsWith',
    'isEmpty',
    'isNull',
    'isUndefined',
    'isArray',
    'isObject',
    'isString',
    'isNumber',
    'isBoolean',
    'isFunction',
    'isTablet',
    'hasOwnProperty',
    'some',
    'every',
    'find',
    'filter'
  ]

  return booleanFunctions.some((func) => functionName.toLowerCase().includes(func))
}

function isBooleanProperty(propertyName) {
  const booleanProperties = [
    'onLine',
    'online',
    'visible',
    'hidden',
    'enabled',
    'disabled',
    'checked',
    'selected',
    'active',
    'loading',
    'ready',
    'valid',
    'authenticated',
    'loggedIn',
    'connected',
    'available'
  ]

  return booleanProperties.some((prop) => propertyName.toLowerCase().includes(prop))
}
