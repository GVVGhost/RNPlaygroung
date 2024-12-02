import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  CornerRadius,
  FontSize,
  Indent,
} from '@theme/DimensionValues.ts';
import {CommonStyles} from '@theme/CommonStyles.ts';

interface Props {
  text?: string;
  onPress?: () => void;
  flex?: number | undefined;
}

const SecondaryButton: React.FC<Props> = ({
  text = 'Button',
  onPress = () => {},
  flex,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        flexDirection: 'row',
        borderRadius: CornerRadius.L,
        justifyContent: 'center',
        paddingVertical: Indent.L,
        paddingHorizontal: Indent.XL,
        backgroundColor: theme.colors.card,
        flex,
      }, CommonStyles.shadow]}>
      <Text
        style={{
          fontSize: FontSize.M,
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
