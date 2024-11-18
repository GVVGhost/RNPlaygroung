import {Theme} from '@react-navigation/native';
import {StyleProp, TextStyle} from 'react-native';
import {FontSize} from '@theme/DimensionValues.ts';

export const labelTextStyle = (theme: Theme): StyleProp<TextStyle> => ({
  fontSize: FontSize.M,
  fontWeight: 'bold',
  color: theme.colors.text,
});
