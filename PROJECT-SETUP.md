# Project settings

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
npm i react-native-dotenv babel-plugin-module-resolver
```

### This is the minimum configuration to get started, after which comes the actual coding

### Also, here the command to install other often used dependencies:

```bash
npm install @react-navigation/bottom-tabs @react-navigation/native @react-navigation/native-stack @react-navigation/stack axios moment react-native-alert-notification react-native-config react-native-gesture-handler react-native-localization react-native-mmkv react-native-progress react-native-uuid react-native-vector-icons react-native-version-info use-debounce zustand
npm install @types/react-native-vector-icons babel-plugin-module-resolver metro-react-native-babel-preset --save-dev
```
