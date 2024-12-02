import {StyleSheet} from 'react-native';
import {Elevation} from '@theme/DimensionValues.ts';

export const CommonStyles = StyleSheet.create({
  shadow: {
    elevation: Elevation.S,
    shadowOffset: {width: Elevation.S, height: Elevation.S},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
