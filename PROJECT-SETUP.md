# Project settings (React Native v0.76)

### Create template structure of project\'s directories

```bash
mkdir src && cd src && mkdir api assets components contexts navigation scenes theme utils && cd ..
```

### Set up `tsconfig.json` in the project\'s root directory 

#### <i>(Optional)</i> If a some file is missing from the project, create it using `touch`. Example of creating babel.config.js and tsconfig.json files: `touch tsconfig.json babel.config.js`

```json
{
  "extends": "@react-native/typescript-config/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@api/*": ["src/api/*"],
      "@assets/*": ["src/assets/*"],
      "@components/*": ["src/components/*"],
      "@contexts/*": ["src/contexts/*"],
      "@navigation/*": ["src/navigation/*"],
      "@scenes/*": ["src/scenes/*"],
      "@theme/*": ["src/theme/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

### Set up `babel.config.js` in the project\'s root directory

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
        allowlist: ['STORAGE_KEY','API_URL'],
      },
    ],
    [
      'module-resolver',
      {
        extensions: [ '.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@contexts': './src/contexts',
          '@navigation': './src/navigation',
          '@scenes': './src/scenes',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};

```

#### Add the following lines to `.gitignore` file:

```gitignore
/package-lock.json
/.env
```
#### In order to remove the `package-lock.json` file from observing by VSC delete them and run:

```bash
rm package-lock.json && npm i
```

#### Add `.env` file

```bash
touch .env
```

```dotenv
STORAGE_KEY=YourStorageKeyForEncryptingLocalData
API_URL=http://YourAPIAddress
```

### Install dependencies for `env` files and `babel` plugin:

```bash
npm install react-native-dotenv
npm install babel-plugin-module-resolver --save-dev
```

### This is the minimum configuration to get started, after which comes the actual coding

### Also, here is a command to install other commonly used dependencies:

```bash
npm install @react-navigation/bottom-tabs @react-navigation/native @react-navigation/native-stack @react-navigation/stack axios moment react-native-config react-native-gesture-handler react-native-localization react-native-mmkv react-native-progress react-native-uuid react-native-vector-icons react-native-version-info use-debounce zustand react-native-safe-area-context react-native-screens react-native-root-toast react-native-alert-notification
npm install @types/react-native-vector-icons metro-react-native-babel-preset --save-dev
```
## Additional adjustments for some dependencies
### For <b>IOS</b>

#### In XCODE open the `Info.plist` file and add new row with key `Fonts provided by application`, then for the `Item 0` key add the `MaterialCommunityIcons.ttf` value.
#### Next need to update the pods with next commands:

```bash
cd ios
pod update
cd ..
```

#### In case of errors there is may need to reinstall pods with

```bash
cd ios
pod deintegrate
pod install
cd ..
```
### For <b>Android</b>
#### Open file `android/app/build.gradle` and near the end of file need to add few lines for `react-native-vector-icons`, `react-native-localization` and `react-native-version-info` dependencies:

```html
dependencies {
    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")

    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
        implementation project(':react-native-localization') //<- add this
        implementation project(':react-native-version-info') //<- add this
    } else {
        implementation jscFlavor
    }
}

apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle") //<- add this

```
