import {Theme} from '@react-navigation/native';

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#a36316',
    background: '#dcd7d2',
    card: '#faf0e6',
    text: '#4e3e37',
    border: '#a18a6d',
    notification: '#e63c3c',
  },
  fonts: {
    regular: {fontFamily: 'normal', fontWeight: 'normal'},
    medium: {fontFamily: 'normal', fontWeight: '500'},
    bold: {fontFamily: 'normal', fontWeight: 'bold'},
    heavy: {fontFamily: 'normal', fontWeight: 'bold'},
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#855022',
    background: '#171616',
    card: '#1b1a1a',
    text: '#817572',
    border: '#252322',
    notification: '#783c3c',
  },
  fonts: {
    regular: {fontFamily: 'normal', fontWeight: 'normal'},
    medium: {fontFamily: 'normal', fontWeight: '500'},
    bold: {fontFamily: 'normal', fontWeight: 'bold'},
    heavy: {fontFamily: 'normal', fontWeight: 'bold'},
  },
};

export const ToastColors = {
  Info: '#265de6',
  Success: '#059f48',
  Warning: '#f4930c',
  Error: '#8c3232',
};
