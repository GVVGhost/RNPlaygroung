import {StyleSheet} from 'react-native';
import {
  BorderWidth,
  CornerRadius,
  Elevation,
  FontSize,
  Indent,
} from '@theme/DimensionValues.ts';

export const TextInputStyles = StyleSheet.create({
  container: {
    alignItems: 'baseline',
    borderWidth: BorderWidth.L,
    borderRadius: CornerRadius.L,
    elevation: Elevation.S,
    fontSize: FontSize.L,
    fontWeight: '400',
    padding: Indent.M,
  },
});
