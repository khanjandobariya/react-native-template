# ALFA IELTS - React Native App

A modern React Native application for IELTS test preparation, built with TypeScript and following best practices for mobile development.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Code Generation](#code-generation)
- [VS Code Setup](#vs-code-setup)
- [Testing](#testing)
- [Building](#building)
- [Contributing](#contributing)

## 🔧 Prerequisites

### Node.js Version

This project requires **Node.js v22.17.0** as specified in the `.node-version` file. We recommend using a Node version manager:

```bash
# Using nvm
nvm use

# Using fnm
fnm use

# Using volta
volta install node@22.17.0
```

### System Requirements

- **iOS**: Xcode 12.0 or later, iOS 11.0 or later
- **Android**: Android SDK 21 or later
- **Development OS**: macOS, Windows, or Linux

### Dependencies

- React Native CLI
- CocoaPods (for iOS)
- Android Studio (for Android development)
- Yarn package manager

## 🚀 Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd alfa-ielts-react-native-app
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **iOS Setup:**

   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup:**
   Make sure you have Android Studio installed and configured with the necessary SDK versions.

## 💻 Development

### Start the Metro bundler:

```bash
yarn start
```

### Run on iOS:

```bash
yarn ios
```

### Run on Android:

```bash
yarn android
```

## 📜 Scripts

| Script                     | Description                            |
| -------------------------- | -------------------------------------- |
| `yarn start`               | Start the Metro bundler                |
| `yarn ios`                 | Run on iOS simulator (iPhone 16)       |
| `yarn android`             | Run on Android emulator/device         |
| `yarn test`                | Run Jest tests                         |
| `yarn linter`              | Run ESLint with auto-fix               |
| `yarn prettier`            | Format code with Prettier              |
| `yarn type-check`          | Run TypeScript type checking           |
| `yarn lint-and-type-check` | Run both linting and type checking     |
| `yarn generate`            | Generate components/screens using Plop |
| `yarn clean`               | Clear Metro cache                      |

## 📁 Project Structure

```
src/
├── App.tsx                 # Main application component
├── assets/                 # Static assets (fonts, images, icons)
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/             # Reusable UI components
│   ├── AppContainer/
│   ├── AppLoader/
│   └── index.ts
├── config/                 # App configuration
│   └── Config.ts
├── hooks/                  # Custom React hooks
│   ├── useAppStateContext.tsx
│   ├── useColor.ts
│   └── index.ts
├── i18n/                   # Internationalization
│   ├── i18n.ts
│   └── locales/
├── network/                # API configuration
│   ├── APICall.ts
│   ├── EndPoints.ts
│   └── index.ts
├── Providers/              # Context providers
│   ├── AppAuthentication/
│   ├── AppEdgedProvider/
│   ├── AppProviders/
│   └── index.ts
├── router/                 # Navigation configuration
│   ├── AppNavigation.tsx
│   ├── RootNavigator.ts
│   └── index.ts
├── screens/                # Screen components
│   ├── auth/
│   │   └── LoginScreen/
│   └── main/
│       ├── DashBoardScreen/
│       └── MoreScreen/
├── theme/                  # Theme configuration
│   ├── Fonts.ts
│   ├── Theme.ts
│   └── ThemeProvider/
├── types/                  # TypeScript type definitions
│   └── commonTypes.ts
└── utils/                  # Utility functions
    ├── Const.ts
    ├── Images.ts
    ├── Screens.ts
    ├── Storage.ts
    └── Utility.ts
```

## 🎨 Code Generation

This project uses **Plop** for consistent code generation. For detailed information about available generators and usage, please refer to:

**📖 [Code Generation Guide](plop/README.md)**

### Quick Start:

```bash
yarn generate
```

Available generators:

- **Component**: Creates reusable UI components with hooks, types, and styles
- **Screen**: Creates screen components with navigation setup

## 🛠️ VS Code Setup

This project includes comprehensive VS Code configuration for an optimal development experience. For detailed information about all configured settings, extensions, and their purposes, please refer to:

**📖 [VS Code Configuration Guide](.vscode/VSCODE_SETTINGS_README.md)**

### Key Features:

- **Auto-formatting** with Prettier on save
- **ESLint integration** with auto-fix
- **TypeScript IntelliSense** enhancements
- **React Native specific** tooling
- **Performance optimizations** for large codebases

### Recommended Extensions:

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- React Native Tools
- TypeScript Importer

## 🧪 Testing

Run the test suite:

```bash
yarn test
```

The project uses Jest as the testing framework with React Native preset configuration.

## 🏗️ Building

### Debug Builds

**Android:**

```bash
cd android && ./gradlew assembleDebug
```

**iOS:**

```bash
cd ios && xcodebuild -workspace alfaielts.xcworkspace -scheme alfaielts -configuration Debug -destination generic/platform=iOS -archivePath alfaielts.xcarchive archive
```

### Release Builds

Follow the official React Native documentation for building release versions for your target platforms.

## 🤝 Contributing

1. **Code Style**: The project enforces code style through ESLint and Prettier
2. **Commits**: Follow conventional commit format (enforced by Husky and Commitlint)
3. **Pre-commit**: Husky runs linting and type checking before commits
4. **Code Generation**: Use `yarn generate` for creating new components/screens

### Development Workflow:

1. Create a feature branch
2. Use code generators for consistency
3. Follow the established project structure
4. Ensure all linting and type checks pass
5. Write tests for new functionality
6. Submit a pull request

## 📱 Features

- **TypeScript** for type safety
- **React Navigation** for navigation
- **Internationalization** (i18n) support
- **Theme system** with custom theming
- **State management** with React Context
- **Network layer** with Axios
- **Local storage** with MMKV
- **Custom hooks** for reusable logic
- **Responsive design** utilities
- **Code generation** with Plop

## 📄 License

This project is private and proprietary.

---

**Happy Coding! 🚀**
