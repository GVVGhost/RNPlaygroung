import {IColors} from 'react-native-alert-notification/lib/typescript/service';
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
};

export const nLight: IColors = {
  card: '#f0f0f0',
  info: '#155E92',
  label: '#69646e',
  danger: '#e63c3c',
  overlay: 'rgba(161,161,161,0.2)',
  warning: '#c4bf21',
  success: '#28ba00',
};

export const nDark: IColors = {
  card: '#323235',
  info: '#155E92',
  label: '#787878',
  danger: '#e63c3c',
  overlay: 'rgba(161,161,161,0.2)',
  warning: '#c4bf21',
  success: '#28ba00',
};
