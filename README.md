# React Native project template

Starter app built on **React Native 0.85** with typed **TypeScript**, **React Navigation** (auth stack + drawer main), **theme / i18n**, **MMKV**, shared **UI components**, **Plop** generators, and ESLint + Prettier aligned with a production app structure.

---

## What’s in the template

| Area | Contents |
|------|----------|
| **Screens** | `LoginScreen` (auth) and `HomeScreen` (main drawer) — minimal placeholders you extend |
| **Navigation** | Root stack: `AuthNavigation` → login flow · `MainStack` → drawer with `HomeScreen` |
| **`src/components`** | **22** shared components (see list below), barrel-exported from `src/components/index.ts` |
| **`src/modals`** | **3** modals: `AppCountryPickerModal`, `AppSelectionModal`, `TestModal` |
| **`src/hooks`** | Shared hooks (`useCommonHooks`, `useResponsiveHook`, theme helpers, etc.) |
| **Theme / styling** | `src/theme`, responsive scaling, reusable style patterns |
| **Data / utils** | `src/network` (axios), storage, constants, emits, helpers |
| **i18n** | `src/i18n` with typed keys and locale JSON |

### Shared components (`src/components`)

There are **22** components registered in `src/components/index.ts`:

`AppBgContainer`, `AppButton`, `AppCard`, `AppCarousel`, `AppContainer`, `AppDropDown`, `AppFlatList`, `AppHeader`, `AppIcon`, `AppInnerContainer`, `AppInputWrapper`, `AppPhoneInput`, `AppPressable`, `AppRadioBtn`, `AppScrollView`, `AppText`, `AppTextAreaInput`, `AppTextInput`, `CompetitionHeader`, `NoDataFound`, `SidemenuDrawer`, `TimeSelectionCard`.

Additional building blocks live under paths such as `src/components/AppInputComponents/` and are composed by the components above.

### Project layout (high level)

```text
template/
├── src/
│   ├── App.tsx
│   ├── components/      # 22 shared components (+ plop-generated)
│   ├── modals/          # 3 modals (+ plop-generated)
│   ├── screens/
│   │   ├── auth/LoginScreen/
│   │   └── main/HomeScreen/
│   ├── router/          # AppNavigation, AuthNavigation, MainNavigation, RootNavigator
│   ├── Providers/
│   ├── theme/
│   ├── hooks/
│   ├── utils/
│   ├── network/
│   ├── i18n/
│   └── config/
├── android/
├── ios/
├── plop/                # Handlebars templates for Plop
├── plopfile.js
└── package.json
```

---

## Requirements

- **Node.js** `>= 22.11.0` (see `template/package.json` → `engines`)
- **Xcode** + **CocoaPods** for iOS
- **Android Studio** + SDK/NDK as required by React Native 0.85

If you use **npm**, the generated app includes **`.npmrc`** with `legacy-peer-deps=true` so installs match how this template is validated (some packages declare outdated peer ranges, e.g. **`react-native-radio-button`** vs React Native **0.85**). Ensure your published template repo **commits** `template/.npmrc` so `react-native init` copies it; without it, **`npm install`** can fail with **`ERESOLVE`**.

**`package.json`** pins **`react`** and **`react-test-renderer`** to **`19.2.6`** and sets **`overrides.react-dom`** to **`19.2.6`** so the transitive **`react-dom`** peer required by **`react-native-country-picker-modal`** aligns with **`react`** (fixes the common “could not resolve … react-dom … peer react@^19.2.6” error when using strict npm).

If install still fails, run:

```bash
npm install --legacy-peer-deps
```

**Yarn** / **pnpm** may behave differently; use their equivalents if needed.

---

## Initialization

This template assumes **Yarn** for installs. **`@react-native-community/cli`** **defaults to `npm`** for the post-copy dependency step unless you override it (`userAgent` only auto-selects **Bun**). To run **`yarn install`** during **`init`** (recommended), **always pass `--pm yarn`** and have Yarn available on your machine.

### 1. Create a new app from this template (with Yarn)

```bash
npx --yes @react-native-community/cli@latest init PROJECT_NAME --template https://github.com/khanjandobariya/react-native-template --pm yarn
```

From a **local clone** (path must point at the repo root that contains `template/` and `template.config.js`):

```bash
npx --yes @react-native-community/cli@latest init PROJECT_NAME --template file:///ABSOLUTE_PATH_TO_CLONE --pm yarn
```

Replace `PROJECT_NAME` with your app name (`ProjectName` is only the placeholder inside the template sources until the CLI substitutes it).

### 2. Dependencies after init

If you used **`--pm yarn`** above, the CLI already runs **`yarn install`** in the new project—you do **not** need to run it again unless the install failed or you used **`--skip-install`**.

Otherwise (e.g. you omitted `--pm yarn`):

```bash
cd PROJECT_NAME && yarn install
```

If you intentionally use **npm** instead:

```bash
cd PROJECT_NAME && npm install
```

See **Requirements** for npm peer-deps notes (`.npmrc`, `legacy-peer-deps`).

### 3. iOS — CocoaPods

```bash
cd ios && pod install && cd ..
```

### 4. Run the app

```bash
yarn start
yarn android   # or: npx react-native run-android
yarn ios       # or: npx react-native run-ios
```

---

## Plop — code generation

This template uses [Plop](https://plopjs.com/) (`plop` + templates under `template/plop/`). After `init`, generators run from **`template/`** (or your generated project root — same layout).

### Command

```bash
yarn generate
```

or

```bash
npm run generate
```

This runs **Plop**, then formats with **Prettier** and fixes **`src/**/index.ts`** with **ESLint** so new exports stay consistent.

### Generators (pick one in the Plop menu)

| Generator | Description |
|-----------|-------------|
| **component** | Asks for **PascalCase** name and optional **path** (default `src/components`). Creates `.tsx`, `.styles.ts`, `hooks/use{Name}.ts`, `types/{Name}.types.ts`. If under `src/components`, updates `src/components/index.ts` imports/exports. |
| **screen** | Asks for **PascalCase** screen name and location under `src/screens`. Creates the same file set as a component, updates `src/screens/index.ts`, `src/utils/Screens.ts`, adds a **stack** entry in `src/router/AppNavigation.tsx`, and can append a **locale** block in `src/i18n/locales/en.json`. |
| **modal** | Name must end with **`Modal`**. Default location `src/modals`. Creates the component structure and updates `src/modals/index.ts`. |

**Tips**

- Use **PascalCase** names (e.g. `ProfileScreen`, `SettingsModal`).
- For screens, you still need to wire **navigation** (e.g. open from login → main) if you add routes beyond the template’s auth + main drawer.
- Plop markers in source files: `// PLOP COMPONENT IMPORTS`, `// PLOP SCREEN STACK`, etc. — keep them so generators can patch the right lines.

Example recording (may differ slightly by repo branch):

![Plop example](https://github.com/khanjandobariya/react-native-template/blob/main/shots/plopExample.gif)

---

## Useful npm/yarn scripts (in generated `package.json`)

| Script | Purpose |
|--------|---------|
| `lint` / `linter` | ESLint |
| `type-check` | `tsc --noEmit` |
| `lint-and-type-check` | Type-check then lint |
| `prettier` | Format `src/**` |
| `generate` | Plop + format + lint index barrels |
| `assets` | `react-native-asset` for fonts linking |

---

## Environment / native notes

- **react-native-config**: use `.env` at project root; native projects are wired for `ProjectName` / `com.projectname` style IDs after initialization.
- **Boot splash**: configured on Android/iOS; ensure you run a full native build after template changes.

If Android native build fails with **“No space left on device”**, free disk space (Gradle caches, build folders) — that is an environment limitation, not a template bug.

---

## License / contributing

Follow your organization’s guidelines for forks and publishing the template URL used in `npx react-native init --template`.
