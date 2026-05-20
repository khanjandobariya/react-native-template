module.exports = function (plop) {
  // --COMPONENT GENERATOR--
  plop.setGenerator('component', {
    description: 'Generate a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "\x1b[33mWhat is this component's name?\x1b[0m",
        validate: function (value) {
          if (!/.+/.test(value)) {
            return 'Component name is required'
          }
          // Check if the value is in PascalCase
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return 'Component name must be in PascalCase (e.g., MyComponent, UserProfile, etc.)'
          }
          return true
        },
        filter: function (value) {
          // Just return the value as-is, no automatic suffix
          return value
        }
      },
      {
        type: 'input',
        name: 'location',
        message:
          '\x1b[33mWhere do you want to create this component? (default: src/components/)\x1b[0m',
        default: 'src/components',
        filter: function (value) {
          // Remove trailing slash if present
          return value.replace(/\/$/, '')
        }
      }
    ],
    actions: function (data) {
      const componentName = plop.getHelper('pascalCase')(data.name)
      const location = data.location

      // Check if the location is inside src/components
      const isInsideComponents = location.includes('src/components')

      const actions = [
        {
          type: 'add',
          path: `${location}/${componentName}/${componentName}.tsx`,
          templateFile: 'plop/plopTemplates/Component.tsx.hbs',
          data: {name: componentName}
        },
        {
          type: 'add',
          path: `${location}/${componentName}/${componentName}.styles.ts`,
          templateFile: 'plop/plopTemplates/styles.ts.hbs',
          data: {name: componentName}
        },
        {
          type: 'add',
          path: `${location}/${componentName}/hooks/use${componentName}.ts`,
          templateFile: 'plop/plopTemplates/useComponent.ts.hbs',
          data: {name: componentName}
        },
        {
          type: 'add',
          path: `${location}/${componentName}/types/${componentName}.types.ts`,
          templateFile: 'plop/plopTemplates/Component.types.ts.hbs',
          data: {name: componentName}
        }
      ]

      // If location is inside src/components, add import/export updates
      if (isInsideComponents) {
        // Calculate relative path from src/components to the component location
        const relativePath = location.split('src/components')[1].replace(/^\//, '')
        const importPath = relativePath
          ? `${relativePath}/${componentName}/${componentName}`
          : `${componentName}/${componentName}`

        actions.push(
          {
            path: 'src/components/index.ts',
            pattern: /(\/\/ PLOP COMPONENT IMPORTS)/g,
            template: `import ${componentName} from './${importPath}';\n$1`,
            type: 'modify'
          },
          {
            path: 'src/components/index.ts',
            pattern: /(\/\/ PLOP COMPONENT EXPORTS)/g,
            template: `$1\n  ${componentName},`,
            type: 'modify'
          }
        )
      }

      return actions
    }
  })

  // --SCREEN GENERATOR--
  plop.setGenerator('screen', {
    description: 'Generate a screen',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "\x1b[33mWhat is this screen's name?\x1b[0m",
        validate: function (value) {
          if (!/.+/.test(value)) {
            return 'Screen name is required'
          }
          // Check if the value is in PascalCase
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return 'Screen name must be in PascalCase (e.g., LoginScreen, DashBoardScreen, etc.)'
          }
          return true
        },
        filter: function (value) {
          // Just return the value as-is
          return value
        }
      },
      {
        type: 'input',
        name: 'location',
        message: '\x1b[33mWhere do you want to create this screen? (default: src/screens/)\x1b[0m',
        default: 'src/screens',
        filter: function (value) {
          // Remove trailing slash if present
          return value.replace(/\/$/, '')
        }
      }
    ],
    actions: function (data) {
      const screenName = plop.getHelper('pascalCase')(data.name)
      const location = data.location

      // Check if the location is inside src/screens
      const isInsideScreens = location.includes('src/screens')

      const actions = [
        {
          type: 'add',
          path: `${location}/${screenName}/${screenName}.tsx`,
          templateFile: 'plop/plopTemplates/Screen.tsx.hbs',
          data: {name: screenName}
        },
        {
          type: 'add',
          path: `${location}/${screenName}/${screenName}.styles.ts`,
          templateFile: 'plop/plopTemplates/styles.ts.hbs',
          data: {name: screenName}
        },
        {
          type: 'add',
          path: `${location}/${screenName}/hooks/use${screenName}.ts`,
          templateFile: 'plop/plopTemplates/useScreen.ts.hbs',
          data: {name: screenName}
        },
        {
          type: 'add',
          path: `${location}/${screenName}/types/${screenName}.types.ts`,
          templateFile: 'plop/plopTemplates/Screen.types.ts.hbs',
          data: {name: screenName}
        }
      ]

      // If location is inside src/screens, add import/export updates
      if (isInsideScreens) {
        // Calculate relative path from src/screens to the screen location
        const relativePath = location.split('src/screens')[1].replace(/^\//, '')
        const importPath = relativePath
          ? `${relativePath}/${screenName}/${screenName}`
          : `${screenName}/${screenName}`

        actions.push(
          {
            path: 'src/screens/index.ts',
            pattern: /(\/\/ PLOP SCREEN IMPORTS)/g,
            template: `import ${screenName} from './${importPath}';\n$1`,
            type: 'modify'
          },
          {
            path: 'src/screens/index.ts',
            pattern: /(\/\/ PLOP SCREEN EXPORTS)/g,
            template: `$1\n  ${screenName},`,
            type: 'modify'
          },
          {
            path: 'src/utils/Screens.ts',
            pattern: /(\/\/ PLOP SCREEN NAME)/g,
            template: `$1\n  ${screenName}: '${screenName}',`,
            type: 'modify'
          },
          {
            path: 'src/utils/Screens.ts',
            pattern: /(\/\/ PLOP SCREEN TYPE)/g,
            template: `$1\n  ${screenName}: string,`,
            type: 'modify'
          },
          {
            path: 'src/router/AppNavigation.tsx',
            pattern: /(\{\/\* PLOP SCREEN STACK \*\/})/g,
            template: `      <Stack.Screen name={Screen.${screenName}} component={View.${screenName}} />\n      $1`,
            type: 'modify'
          },
          {
            path: 'src/i18n/locales/en.json',
            pattern: /(}\s*)(?=\s*}\s*$)/g,
            template: `,\n    "{{camelCase name}}": {\n      "welcome": "Welcome"\n    }$1`,
            type: 'modify'
          }
        )
      }

      return actions
    }
  })

  // --MODAL GENERATOR--
  plop.setGenerator('modal', {
    description: 'Generate a modal',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "\x1b[33mWhat is this modal's name?\x1b[0m",
        validate: function (value) {
          if (!/.+/.test(value)) {
            return 'Modal name is required'
          }
          // Check if the value is in PascalCase
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return 'Modal name must be in PascalCase (e.g., MyModal, UserProfileModal, etc.)'
          }
          // Check if the name ends with "Modal"
          if (!/Modal$/.test(value)) {
            return 'Modal name must end with "Modal" (e.g., MyModal, UserProfileModal, etc.)'
          }
          return true
        },
        filter: function (value) {
          // Just return the value as-is, no automatic suffix
          return value
        }
      },
      {
        type: 'input',
        name: 'location',
        message:
          '\x1b[33mWhere do you want to create this modal? (default: src/modals/)\x1b[0m',
        default: 'src/modals',
        filter: function (value) {
          // Remove trailing slash if present
          return value.replace(/\/$/, '')
        }
      }
    ],
    actions: function (data) {
      const modalName = plop.getHelper('pascalCase')(data.name)
      const location = data.location

      // Check if the location is inside src/modals
      const isInsideModals = location.includes('src/modals')

      const actions = [
        {
          type: 'add',
          path: `${location}/${modalName}/${modalName}.tsx`,
          templateFile: 'plop/plopTemplates/Component.tsx.hbs',
          data: {name: modalName}
        },
        {
          type: 'add',
          path: `${location}/${modalName}/${modalName}.styles.ts`,
          templateFile: 'plop/plopTemplates/styles.ts.hbs',
          data: {name: modalName}
        },
        {
          type: 'add',
          path: `${location}/${modalName}/hooks/use${modalName}.ts`,
          templateFile: 'plop/plopTemplates/useComponent.ts.hbs',
          data: {name: modalName}
        },
        {
          type: 'add',
          path: `${location}/${modalName}/types/${modalName}.types.ts`,
          templateFile: 'plop/plopTemplates/Component.types.ts.hbs',
          data: {name: modalName}
        }
      ]

      // If location is inside src/modals, add import/export updates
      if (isInsideModals) {
        // Calculate relative path from src/modals to the modal location
        const relativePath = location.split('src/modals')[1].replace(/^\//, '')
        const importPath = relativePath
          ? `${relativePath}/${modalName}/${modalName}`
          : `${modalName}/${modalName}`

        actions.push(
          {
            path: 'src/modals/index.ts',
            pattern: /(\/\/ PLOP MODAL IMPORTS)/g,
            template: `import ${modalName} from './${importPath}';\n$1`,
            type: 'modify'
          },
          {
            path: 'src/modals/index.ts',
            pattern: /(\/\/ PLOP MODAL EXPORTS)/g,
            template: `$1\n  ${modalName},`,
            type: 'modify'
          }
        )
      }

      return actions
    }
  })
}
