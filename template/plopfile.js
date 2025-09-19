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
      const isInsideComponents = location.startsWith('src/components')

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
        const relativePath = location.replace('src/components/', '').replace('src/components', '')
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
            template: `,\n  ${componentName}$1`,
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
      const isInsideScreens = location.startsWith('src/screens')

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
        const relativePath = location.replace('src/screens/', '').replace('src/screens', '')
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
            template: `,\n  ${screenName}$1`,
            type: 'modify'
          }
        )
      }

      return actions
    }
  })
}
