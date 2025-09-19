# Plop Generator

Code generator for creating components and screens with consistent architecture.

## Usage

```bash
yarn run generate
```

## Generators

### Component

Generates a component with hooks, types, and styles.

```bash
# Choose "component"
# Name: ButtonComponent
# Location: src/components (default) or custom path
```

### Screen

Generates a screen with hooks, types, and styles.

```bash
# Choose "screen"
# Name: ProfileScreen
# Location: src/screens (default) or custom path
```

## Custom Paths

### Default Locations

- **Components**: `src/components`
- **Screens**: `src/screens`

### Custom Locations

You can specify any path:

- `src/screens/main/components` - Screen-specific components
- `src/components/ui` - UI components subfolder
- `src/screens/auth` - Auth screens subfolder

## Auto Index Updates

When generating inside default folders, index files are automatically updated:

- `src/components/*` → Updates `src/components/index.ts`
- `src/screens/*` → Updates `src/screens/index.ts`

## Generated Structure

```
YourName/
├── YourName.tsx
├── YourName.styles.ts
├── hooks/
│   └── useYourName.ts
└── types/
    └── YourName.types.ts
```
