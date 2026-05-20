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
              },
              ignoreKeywords: {
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
        const ignoreKeywords = options.ignoreKeywords || []

        function isIgnoredVariable(variableName) {
          if (ignoredVariableNames.includes(variableName)) {
            return true
          }
          if (ignoreKeywords.some(keyword => variableName.includes(keyword))) {
            return true
          }
          return false
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
        schema: [
          {
            type: 'object',
            properties: {
              excludePaths: {
                type: 'array',
                items: {type: 'string'}
              }
            },
            additionalProperties: false
          }
        ]
      },
      create(context) {
        // Get excluded paths from options
        const options = context.options[0] || {}
        const excludePaths = options.excludePaths || []
        
        // Helper to check if current file should be excluded
        function isFileExcluded() {
          const filename = context.getFilename()
          return excludePaths.some(excludePath => {
            // Normalize path separators
            const normalizedPath = excludePath.replace(/\\/g, '/')
            const normalizedFile = filename.replace(/\\/g, '/')
            
            // Check if it's a folder exclusion (ends with /) or file exclusion
            if (normalizedPath.endsWith('/')) {
              return normalizedFile.includes(normalizedPath)
            }
            return normalizedFile.includes(normalizedPath) || normalizedFile.endsWith(normalizedPath)
          })
        }

        function isRenderFunction(node) {
          // Check if function returns JSX
          if (!node.init) return false

          // ✅ Check for TypeScript return type annotation (JSX.Element, React.ReactElement, etc.)
          if (node.init.returnType && node.init.returnType.typeAnnotation) {
            const returnType = node.init.returnType.typeAnnotation
            
            // Handle TSTypeReference (e.g., JSX.Element, ReactElement)
            if (returnType.type === 'TSTypeReference' && returnType.typeName) {
              let typeName = ''
              
              // Handle qualified names (e.g., JSX.Element)
              if (returnType.typeName.type === 'TSQualifiedName') {
                typeName = `${returnType.typeName.left.name}.${returnType.typeName.right.name}`
              } else if (returnType.typeName.name) {
                typeName = returnType.typeName.name
              }
              
              // Check if it's a JSX/React element type
              const jsxReturnTypes = [
                'JSX.Element',
                'Element',
                'ReactElement',
                'React.ReactElement',
                'ReactNode',
                'React.ReactNode'
              ]
              
              if (jsxReturnTypes.includes(typeName)) {
                return true
              }
            }
            
            // Handle union types (e.g., JSX.Element | null)
            if (returnType.type === 'TSUnionType' && returnType.types) {
              return returnType.types.some((type) => {
                if (type.type === 'TSTypeReference' && type.typeName) {
                  let typeName = ''
                  if (type.typeName.type === 'TSQualifiedName') {
                    typeName = `${type.typeName.left.name}.${type.typeName.right.name}`
                  } else if (type.typeName.name) {
                    typeName = type.typeName.name
                  }
                  
                  return (
                    typeName === 'JSX.Element' ||
                    typeName === 'Element' ||
                    typeName === 'ReactElement' ||
                    typeName === 'React.ReactElement' ||
                    typeName === 'ReactNode' ||
                    typeName === 'React.ReactNode'
                  )
                }
                return false
              })
            }
          }

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
            // Skip if file is in excluded paths
            if (isFileExcluded()) {
              return
            }

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
                if (!functionName.startsWith('on') && !functionName.startsWith('get')) {
                  context.report({
                    node: node.id,
                    message: `Function '${functionName}' handles press/navigation functionality and should start with 'on' or 'get' (e.g., onNavigate, onPress, onLogin, onBack, getNotifications)`
                  })
                } else if (!isCamelCase(functionName)) {
                  context.report({
                    node: node.id,
                    message: `Event handler '${functionName}' should use camelCase naming`
                  })
                }
              }

              // ✨ NEW: Check ALL other regular functions
              else {
                if (!functionName.startsWith('on') && !functionName.startsWith('get') && !functionName.startsWith('set')) {
                  context.report({
                    node: node.id,
                    message: `Function '${functionName}' should start with 'on' or 'get' or 'set' (e.g., onUserSelection, getUserData, setUserData)`
                  })
                } else if (!isCamelCase(functionName)) {
                  context.report({
                    node: node.id,
                    message: `Function '${functionName}' should use camelCase naming`
                  })
                }
              }
            }
          }
        }
      }
    },

    'prefer-lodash-methods': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce using Lodash methods instead of native JavaScript array/object/string methods',
          category: 'Best Practices',
          recommended: true
        },
        fixable: null,
        messages: {
          useLodash: 'Use Lodash {{lodashMethod}} instead of native .{{nativeMethod}}(). Import it from lodash: import { {{lodashMethod}} } from "lodash"'
        },
        schema: []
      },
      create(context) {
        // Comprehensive map of native methods to their Lodash equivalents
        const methodMapping = {
          // ===== ARRAY METHODS =====
          find: 'find',
          filter: 'filter',
          findIndex: 'findIndex',
          findLast: 'findLast',
          findLastIndex: 'findLastIndex',
          map: 'map',
          reduce: 'reduce',
          reduceRight: 'reduceRight',
          forEach: 'forEach',
          some: 'some',
          every: 'every',
          includes: 'includes',
          indexOf: 'indexOf',
          lastIndexOf: 'lastIndexOf',
          slice: 'slice',
          flat: 'flatten',
          flatMap: 'flatMap',
          sort: 'sortBy',
          reverse: 'reverse',
          join: 'join',
          fill: 'fill',
          concat: 'concat',
          
          // ===== OBJECT METHODS (for method calls, not Object.* static) =====
          keys: 'keys',
          values: 'values',
          entries: 'toPairs',
          
          // ===== STRING METHODS =====
          startsWith: 'startsWith',
          endsWith: 'endsWith',
          trim: 'trim',
          trimStart: 'trimStart',
          trimEnd: 'trimEnd',
          padStart: 'padStart',
          padEnd: 'padEnd',
          repeat: 'repeat',
          replace: 'replace',
          split: 'split',
          toLowerCase: 'toLower',
          toUpperCase: 'toUpper',
          
          // ===== COLLECTION OPERATIONS =====
          at: 'nth'
        }

        // Helper function to check if method call is part of a validation library chain
        function isValidationLibraryChain(node) {
          // Check if the object is a CallExpression (method chaining)
          if (node.callee && node.callee.type === 'MemberExpression' && node.callee.object) {
            let current = node.callee.object
            
            // Traverse up the chain to find validation library usage
            while (current) {
              // Check for yup.string(), yup.array(), yup.object(), etc.
              if (
                current.type === 'CallExpression' &&
                current.callee &&
                current.callee.type === 'MemberExpression' &&
                current.callee.object &&
                current.callee.object.type === 'Identifier'
              ) {
                const libraryName = current.callee.object.name
                const methodName = current.callee.property?.name
                
                // Common validation libraries and their schema methods
                const validationLibraries = ['yup', 'zod', 'joi', 'validator', 'v']
                const validationMethods = [
                  'string',
                  'number',
                  'boolean',
                  'date',
                  'array',
                  'object',
                  'mixed',
                  'lazy',
                  'ref',
                  'schema'
                ]
                
                if (
                  validationLibraries.includes(libraryName) &&
                  validationMethods.includes(methodName)
                ) {
                  return true
                }
              }
              
              // Move up the chain
              if (current.type === 'CallExpression') {
                current = current.callee
              } else if (current.type === 'MemberExpression') {
                current = current.object
              } else {
                break
              }
            }
          }
          return false
        }

        // Helper function to check if object is likely NOT a native JS type
        function isLibraryOrCustomObject(node) {
          if (!node.callee || !node.callee.object) return false
          
          const objectNode = node.callee.object
          
          // Known library objects that have methods with same names as native JS
          const knownLibraryObjects = [
            'navigation',
            'router',
            'route',
            'history',
            'location',
            'navigator',
            'console',
            'window',
            'document',
            'localStorage',
            'sessionStorage',
            'formData',
            'axios',
            'fetch',
            'request',
            'response',
            'client',
            'server',
            'socket',
            'connection',
            'db',
            'query',
            'schema',
            'model',
            'controller',
            'service',
            'store',
            'state',
            'dispatch',
            'context',
            'ref',
            'props',
            'theme',
            'styles',
            'config',
            'options',
            'settings'
          ]
          
          // Check if object is an identifier with a known library name
          if (objectNode.type === 'Identifier') {
            const objectName = objectNode.name
            
            // Check against known library objects
            if (knownLibraryObjects.includes(objectName)) {
              return true
            }
            
            // Check if it's a hook result (starts with 'use' or ends with common patterns)
            if (
              objectName.startsWith('use') ||
              objectName.endsWith('Ref') ||
              objectName.endsWith('Context') ||
              objectName.endsWith('Provider') ||
              objectName.endsWith('Instance') ||
              objectName.endsWith('Client') ||
              objectName.endsWith('Service') ||
              objectName.endsWith('Manager')
            ) {
              return true
            }
          }
          
          // Check if object is result of a function call (likely not a native type)
          // e.g., useNavigation().replace(), getSomething().map()
          if (objectNode.type === 'CallExpression') {
            // If it's a direct call result, it's likely a library object
            // Exception: Array methods that return arrays (filter, map, slice, etc.)
            if (objectNode.callee && objectNode.callee.type === 'Identifier') {
              const callerName = objectNode.callee.name
              // Skip if it's a known function that returns native types
              const nativeReturningFunctions = ['String', 'Number', 'Boolean', 'Array', 'Object']
              if (!nativeReturningFunctions.includes(callerName)) {
                return true
              }
            }
            
            // Check if it's a chained call from a hook or library
            if (
              objectNode.callee &&
              objectNode.callee.type === 'MemberExpression' &&
              objectNode.callee.object &&
              objectNode.callee.object.type === 'Identifier'
            ) {
              const chainedObjectName = objectNode.callee.object.name
              if (knownLibraryObjects.includes(chainedObjectName)) {
                return true
              }
            }
          }
          
          // Check if it's a member access on a library object
          // e.g., props.navigation.replace()
          if (objectNode.type === 'MemberExpression' && objectNode.object) {
            if (objectNode.object.type === 'Identifier') {
              const parentObjectName = objectNode.object.name
              if (knownLibraryObjects.includes(parentObjectName)) {
                return true
              }
            }
          }
          
          return false
        }

        return {
          CallExpression(node) {
            // Check if this is a method call on an object/array (e.g., array.find())
            if (
              node.callee &&
              node.callee.type === 'MemberExpression' &&
              node.callee.property &&
              node.callee.property.type === 'Identifier'
            ) {
              const methodName = node.callee.property.name
              
              // Skip if this is part of a validation library chain
              if (isValidationLibraryChain(node)) {
                return
              }
              
              // Skip if this is a known library/custom object (not native JS)
              if (isLibraryOrCustomObject(node)) {
                return
              }
              
              // Check if this method should use Lodash instead
              if (methodMapping[methodName]) {
                const lodashMethod = methodMapping[methodName]
                
                context.report({
                  node: node.callee.property,
                  messageId: 'useLodash',
                  data: {
                    nativeMethod: methodName,
                    lodashMethod: lodashMethod
                  }
                })
              }
            }
            
            // Check for Object.*, Array.*, and Math.* static methods (e.g., Object.keys(), Math.floor())
            if (
              node.callee &&
              node.callee.type === 'MemberExpression' &&
              node.callee.object &&
              node.callee.object.type === 'Identifier' &&
              node.callee.property &&
              node.callee.property.type === 'Identifier'
            ) {
              const objectName = node.callee.object.name
              const methodName = node.callee.property.name
              
              // Only check for native global objects
              const nativeGlobalObjects = ['Object', 'Array', 'Math']
              
              if (!nativeGlobalObjects.includes(objectName)) {
                return
              }
              
              // Map Object.*, Array.*, and Math.* methods to Lodash equivalents
              const staticMethodMapping = {
                'Object.keys': 'keys',
                'Object.values': 'values',
                'Object.entries': 'toPairs',
                'Object.assign': 'assign',
                'Object.create': 'create',
                'Array.isArray': 'isArray',
                'Array.from': 'toArray',
                'Math.max': 'max',
                'Math.min': 'min',
                'Math.floor': 'floor',
                'Math.ceil': 'ceil',
                'Math.round': 'round'
              }
              
              const fullMethodName = `${objectName}.${methodName}`
              
              if (staticMethodMapping[fullMethodName]) {
                const lodashMethod = staticMethodMapping[fullMethodName]
                
                context.report({
                  node: node.callee,
                  messageId: 'useLodash',
                  data: {
                    nativeMethod: fullMethodName,
                    lodashMethod: lodashMethod
                  }
                })
              }
            }
          }
        }
      }
    },

    'asset-files-snake-case': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce snake_case naming for files in specified asset folders',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: null,
        schema: [
          {
            type: 'object',
            properties: {
              assetPaths: {
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
        const assetPaths = options.assetPaths || []

        // Helper function to check if a string is snake_case
        function isSnakeCase(str) {
          // Remove file extension
          const nameWithoutExt = str.replace(/\.[^/.]+$/, '')
          // Check if it's snake_case: lowercase letters, numbers, and underscores only
          // Must start with a letter or number, not underscore
          return /^[a-z0-9]+(_[a-z0-9]+)*$/.test(nameWithoutExt)
        }

        // Helper function to extract filename from path
        function getFileName(filePath) {
          const path = require('path')
          return path.basename(filePath)
        }

        // Helper function to check if path matches any of the configured asset paths
        function isAssetFile(filePath) {
          if (assetPaths.length === 0) {
            return false
          }
          
          const normalizedPath = filePath.replace(/\\/g, '/')
          
          return assetPaths.some(assetPath => {
            const normalizedAssetPath = assetPath.replace(/\\/g, '/')
            // Check if the path includes the asset path
            return normalizedPath.includes(normalizedAssetPath)
          })
        }

        // Helper function to convert camelCase/PascalCase to snake_case
        function toSnakeCase(str) {
          return str
            .replace(/([A-Z])/g, '_$1') // Convert camelCase to snake_case
            .toLowerCase()
            .replace(/^_+/, '') // Remove leading underscores
            .replace(/-/g, '_') // Convert hyphens to underscores
        }

        function checkAssetFileName(node, filePath) {
          if (!isAssetFile(filePath)) {
            return
          }

          const fileName = getFileName(filePath)
          
          // Skip if already snake_case
          if (isSnakeCase(fileName)) {
            return
          }

          // Extract name without extension for better error message
          const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
          const expectedName = toSnakeCase(nameWithoutExt)
          const path = require('path')
          const extension = path.extname(fileName)
          const expectedFileName = expectedName + extension

          context.report({
            node,
            message: `Asset file '${fileName}' should be in snake_case. Expected: '${expectedFileName}'`
          })
        }

        return {
          // Check require() statements
          CallExpression(node) {
            if (
              node.callee &&
              node.callee.type === 'Identifier' &&
              node.callee.name === 'require' &&
              node.arguments &&
              node.arguments.length > 0 &&
              node.arguments[0].type === 'Literal'
            ) {
              const filePath = node.arguments[0].value
              if (typeof filePath === 'string') {
                checkAssetFileName(node.arguments[0], filePath)
              }
            }
          },

          // Check import statements
          ImportDeclaration(node) {
            if (node.source && node.source.type === 'Literal') {
              const filePath = node.source.value
              if (typeof filePath === 'string') {
                checkAssetFileName(node.source, filePath)
              }
            }
          }
        }
      }
    },
    'prefer-typed-translation': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce use of useTypedTranslation instead of useTranslation from react-i18next',
          category: 'Best Practices',
          recommended: true
        },
        fixable: null,
        schema: []
      },
      create(context) {
        // Get the current file path
        const filename = context.getFilename()
        
        // Allow useTranslation import in the useTypedTranslation.ts file itself
        const isTypedTranslationFile = filename.includes('useTypedTranslation.ts')
        
        return {
          ImportDeclaration(node) {
            // Skip if this is the useTypedTranslation.ts file itself
            if (isTypedTranslationFile) {
              return
            }
            
            // Check if importing from 'react-i18next'
            if (node.source && node.source.type === 'Literal' && node.source.value === 'react-i18next') {
              // Check if useTranslation is being imported
              const useTranslationImport = node.specifiers.find(
                (spec) =>
                  spec.type === 'ImportSpecifier' &&
                  spec.imported &&
                  spec.imported.name === 'useTranslation'
              )

              if (useTranslationImport) {
                context.report({
                  node: useTranslationImport,
                  message:
                    "Use 'useTypedTranslation' from '@/i18n' instead of 'useTranslation' from 'react-i18next' for type-safe translations. Replace: import { useTranslation } from 'react-i18next' with: import { useTypedTranslation } from '@/i18n'"
                })
              }
            }
          },
          // Also check for usage of useTranslation hook
          CallExpression(node) {
            // Skip if this is the useTypedTranslation.ts file itself
            if (isTypedTranslationFile) {
              return
            }
            
            if (
              node.callee &&
              node.callee.type === 'Identifier' &&
              node.callee.name === 'useTranslation'
            ) {
              // Check if useTranslation is imported from react-i18next
              const sourceCode = context.sourceCode || context.getSourceCode()
              const ast = sourceCode.ast || sourceCode
              
              // Check imports in the file
              if (ast && ast.body) {
                const hasReactI18nextImport = ast.body.some(
                  (stmt) =>
                    stmt.type === 'ImportDeclaration' &&
                    stmt.source &&
                    stmt.source.value === 'react-i18next' &&
                    stmt.specifiers.some(
                      (spec) =>
                        spec.type === 'ImportSpecifier' &&
                        spec.imported &&
                        spec.imported.name === 'useTranslation'
                    )
                )

                if (hasReactI18nextImport) {
                  context.report({
                    node: node.callee,
                    message:
                      "Use 'useTypedTranslation()' from '@/i18n' instead of 'useTranslation()' from 'react-i18next' for type-safe translations"
                  })
                }
              }
            }
          }
        }
      }
    },

    'no-duplicate-i18n-strings': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Detect duplicate string values in i18n locale JSON files',
          category: 'Best Practices',
          recommended: true
        },
        fixable: null,
        schema: [
          {
            type: 'object',
            properties: {
              localePaths: {
                type: 'array',
                items: {
                  type: 'string'
                },
                default: ['src/i18n/locales']
              }
            },
            additionalProperties: false
          }
        ]
      },
      create(context) {
        const fs = require('fs')
        const options = context.options[0] || {}
        const localePaths = options.localePaths || ['src/i18n/locales']

        const filename = context.getFilename()
        const isLocaleFile = localePaths.some(localePath => 
          filename.includes(localePath) && filename.endsWith('.json')
        )

        if (!isLocaleFile) {
          return {}
        }

        try {
          const sourceCode = context.getSourceCode()
          const fileContent = sourceCode.getText()
          const jsonData = JSON.parse(fileContent)
          const lines = fileContent.split('\n')
          
          // Map to store string values and their locations (case-insensitive key)
          const stringsMap = new Map()
          
          // Function to recursively collect all string values with their paths
          function collectStrings(obj, currentPath = '') {
            if (typeof obj === 'string') {
              const normalizedValue = obj.trim()
              if (normalizedValue) {
                // Use lowercase key for case-insensitive comparison
                const caseInsensitiveKey = normalizedValue.toLowerCase()
                if (!stringsMap.has(caseInsensitiveKey)) {
                  stringsMap.set(caseInsensitiveKey, [])
                }
                stringsMap.get(caseInsensitiveKey).push({
                  path: currentPath,
                  originalValue: normalizedValue // Store original case
                })
              }
            } else if (Array.isArray(obj)) {
              obj.forEach((item, index) => {
                collectStrings(item, `${currentPath}[${index}]`)
              })
            } else if (obj && typeof obj === 'object') {
              Object.keys(obj).forEach(key => {
                const newPath = currentPath ? `${currentPath}.${key}` : key
                collectStrings(obj[key], newPath)
              })
            }
          }

          collectStrings(jsonData)
          
          // Find duplicates and report them with line numbers
          stringsMap.forEach((locations, caseInsensitiveKey) => {
            if (locations.length > 1) {
              // Get all unique original values (with different cases)
              const originalValues = [...new Set(locations.map(loc => loc.originalValue))]
              const valuesDisplay = originalValues.length > 1 
                ? originalValues.map(v => `"${v}"`).join(' / ')
                : `"${originalValues[0]}"`
              
              // Find line numbers for each location
              const locationLineNumbers = locations.map(location => {
                const originalValue = location.originalValue
                const escapedValue = originalValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                
                // Search for this exact value in the file
                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i]
                  // Match the exact value (case-sensitive) as a JSON string value
                  const regex = new RegExp(`:\\s*"${escapedValue}"`, 'g')
                  if (regex.test(line)) {
                    return i + 1 // Line numbers are 1-indexed
                  }
                }
                return null
              })
              
              // Report error on each duplicate occurrence
              locations.forEach((location, index) => {
                const originalValue = location.originalValue
                const otherPaths = locations
                  .filter((_, i) => i !== index)
                  .map(loc => `${loc.path} ("${loc.originalValue}")`)
                  .join(', ')
                
                const lineNumber = locationLineNumbers[index] || (index + 1)
                const line = lines[lineNumber - 1] || ''
                // Find the actual value in the line (case-sensitive match)
                const valueIndex = line.indexOf(`"${originalValue}"`)
                const column = valueIndex >= 0 ? valueIndex : 0
                
                context.report({
                  loc: {
                    start: { line: lineNumber, column: column },
                    end: { line: lineNumber, column: column + originalValue.length + 2 }
                  },
                  message: `Duplicate i18n string value (case-insensitive): ${valuesDisplay}. Also found at: ${otherPaths}. Consider using a common key instead.`
                })
              })
            }
          })
        } catch (error) {
          if (error instanceof SyntaxError) {
            // JSON syntax errors will be caught by JSON parser
            return {}
          }
          const sourceCode = context.getSourceCode()
          context.report({
            node: sourceCode.ast,
            message: `Error validating i18n file: ${error.message}`
          })
        }

        return {}
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

  // Helper function to check if a value is static (recursive)
  function isStaticValue(value) {
    if (!value) return false
    
    // Literal values are static
    if (value.type === 'Literal') return true
    
    // References to other variables (Identifiers) are considered static
    // These are typically imported constants or module-level constants
    if (value.type === 'Identifier') return true
    
    // MemberExpressions like Icons.overallIcon are considered static
    // These are typically references to imported constant objects
    if (value.type === 'MemberExpression') {
      // Check if it's a property access on an Identifier (like Icons.something)
      if (value.object && value.object.type === 'Identifier') {
        return true
      }
      // Recursively check nested member expressions
      return isStaticValue(value.object)
    }
    
    // ObjectExpressions are static if all their properties are static
    if (value.type === 'ObjectExpression') {
      return value.properties.every((prop) => {
        if (!prop.value) return false
        return isStaticValue(prop.value)
      })
    }
    
    // ArrayExpressions are static if all elements are static
    if (value.type === 'ArrayExpression') {
      return value.elements.every((element) => element && isStaticValue(element))
    }
    
    return false
  }

  // Object/Array literals with only primitive values or static references are considered static
  if (init.type === 'ObjectExpression') {
    return init.properties.every((prop) => {
      if (!prop.value) return false
      return isStaticValue(prop.value)
    })
  }

  if (init.type === 'ArrayExpression') {
    return init.elements.every((element) => element && isStaticValue(element))
  }

  // Template literals with only static content
  if (init.type === 'TemplateLiteral') {
    return init.expressions.length === 0
  }

  // Function calls, new expressions are not static
  if (
    init.type === 'CallExpression' ||
    init.type === 'NewExpression'
  ) {
    return false
  }

  // MemberExpressions and Identifiers can be static if they reference constants
  // This is handled by the recursive isStaticValue function above
  if (init.type === 'MemberExpression' || init.type === 'Identifier') {
    // For top-level, we consider these static if they're const declarations
    // The recursive check in isStaticValue handles nested cases
    return true
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
