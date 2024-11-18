import {FC, ReactNode} from 'react';
import {StatusBar, StyleProp, View, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Indent} from '@theme/DimensionValues.ts';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const RootScreenWrapper: FC<Props> = ({children, style}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          padding: Indent.S,
        },
        style,
      ]}>
      <StatusBar backgroundColor={colors?.primary} barStyle="light-content" />
      {children}
    </View>
  );
};

export default RootScreenWrapper;
