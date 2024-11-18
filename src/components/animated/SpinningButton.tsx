import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {CornerRadius} from '@theme/DimensionValues.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconName?: string;
  onPress?: () => void;
  animated?: boolean;
  size?: number;
}

const SpinningButton: React.FC<Props> = ({
  iconName = 'play',
  onPress = () => {},
  animated = false,
  size = 50,
}) => {
  const {colors} = useTheme();
  const duration = 1000;
  const halfSize = size / 2;

  const spinValue = new Animated.Value(0);

  let loop = Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: duration,
      easing: Easing.sin,
      useNativeDriver: true,
    }),
  );

  useEffect(() => {
    if (animated) loop.start();
    else loop.reset();
  }, [animated]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const style = StyleSheet.create({
    dot: {
      backgroundColor: colors.primary,
      borderRadius: CornerRadius.XS,
      // position: 'absolute',
      height: 6,
      width: 6,
    },
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.primary,
          borderRadius: size,
          zIndex: 2,
        }}>
        <Icon name={iconName} size={halfSize} color={colors.background} />
      </TouchableOpacity>
      <Animated.View
        style={{
          height: '58%',
          width: '58%',
          position: 'absolute',
          transform: [{rotate: spin}],
        }}>
        {animated && (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              flex: 1,
            }}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={style.dot} />
              <View style={style.dot} />
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={style.dot} />
              <View style={style.dot} />
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default SpinningButton;
