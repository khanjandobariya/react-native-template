
# React native project template

## Initialization

run below command with to generate react native project with this template.

```bash
npx react-native init PROJECT_NAME --template https://github.com/khanjandobariya/react-native-template
```
or
```bash
npx react-native init PROJECT_NAME --template PATH_TO_LOCAL
```

## Automatically generate components and screens

we are using [plop.js](https://plopjs.com/) to generate components and screens using command line in matter of seconds.

in your terminal run ,
```bash
yarn generate
```
this will prompt you to choose a generator  
1️⃣ common component\
2️⃣ screen\
3️⃣ screen specific component 


1️⃣ common component for common component it will ask for the component name and create the new common component with basic code structure at
```bash
|--src
   |--components
      |--ComponentName
         |--ComponentName.tsx
         |--ComponentName.styles.ts
```
it will also export it from index.js Automatically

2️⃣ for screens it will ask for the screen name and create the new screen with basic code structure at    
```bash
|--src
   |--screens
      |--ScreenName
         |--ScreenName.tsx
         |--ScreenName.styles.ts
```
it will also export it from index.js Automatically

3️⃣ for screen specifc component it will ask for the screen name which this component belongs to and then it will ask for the component name then it will create the new component with basic code structure inside that specific screen's component folder   
```bash
|--src
   |--screens
      |--ScreenName
         |--components
            |--ComponentName.tsx
            |--ComponentName.styles.ts
```

...and voila 🪄 your component/screen is generated in matter of seconds.

example
![Example gif](https://github.com/khanjandobariya/react-native-template/blob/main/shots/plopExample.gif)