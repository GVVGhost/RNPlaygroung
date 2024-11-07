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
        allowlist: [
          'REACT_APP_API_URL',
          'REACT_APP_CRYPTO_KEY',
          'REACT_APP_STORAGE_KEY',
        ],
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
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
