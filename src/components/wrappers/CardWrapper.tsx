import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CornerRadius, Indent} from '@theme/DimensionValues.ts';
import {CommonStyles} from '@theme/CommonStyles.ts';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CardWrapper: React.FC<Props> = ({children, style}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          padding: Indent.XL,
          borderRadius: CornerRadius.L,
        },
        CommonStyles.shadow,
        style,
      ]}>
      {children}
    </View>
  );
};

export default CardWrapper;
