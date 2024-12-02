import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  CornerRadius,
  IconSize,
  Indent,
} from '@theme/DimensionValues.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonStyles} from '@theme/CommonStyles.ts';

interface Props {
  iconName?: string;
  onPress?: () => void;
}

const RoundedIconButton: React.FC<Props> = ({
  iconName = 'pencil',
  onPress = () => {},
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        backgroundColor: colors.primary,
        borderRadius: CornerRadius.XL,
        padding: Indent.L,
        margin: Indent.XS,
      }, CommonStyles.shadow]}>
      <Icon name={iconName} size={IconSize.S} color={colors.background} />
    </TouchableOpacity>
  );
};

export default RoundedIconButton;
