import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {
  CornerRadius,
  Elevation,
  FontSize,
  Indent,
} from '@theme/DimensionValues.ts';
import {CommonStyles} from '@theme/CommonStyles.ts';

interface Props {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton: React.FC<Props> = ({
  text = 'Button',
  onPress = () => {},
  style,
}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[{
        backgroundColor: colors.background,
        borderRadius: CornerRadius.M,
      }, CommonStyles.shadow]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            backgroundColor: colors.primary,
            borderRadius: CornerRadius.M,
            padding: Indent.L,
          },
          style,
        ]}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              color: colors.background,
              fontWeight: 'bold',
              fontSize: FontSize.M,
            }}>
            {text.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default PrimaryButton;
