import {ActivityIndicator, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  CornerRadius,
  Elevation,
  IconSize,
  Indent,
} from '@theme/DimensionValues.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  iconName?: string;
  onPress?: () => void;
  isAnimated: boolean;
}

const RoundedAnimatedButton: React.FC<Props> = ({
  iconName = 'pencil',
  onPress = () => {},
  isAnimated,
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        borderRadius: CornerRadius.XL,
        padding: Indent.L,
        elevation: Elevation.S,
        margin: Indent.XS,
      }}>
      {isAnimated ? (
        <ActivityIndicator
          animating={isAnimated}
          color={colors.background}
          size={IconSize.S}
        />
      ) : (
        <Icon name={iconName} size={IconSize.S} color={colors.background} />
      )}
    </TouchableOpacity>
  );
};

export default RoundedAnimatedButton;
