import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CornerRadius,
  FontSize,
  IconSize,
  Indent,
} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {CommonStyles} from '@theme/CommonStyles.ts';

export interface PressableListComponentProps {
  label?: string;
  leftIconName?: string;
  handler?: {
    onPress: () => void;
    iconName: string;
  };
}

const PressableListComponent: React.FC<PressableListComponentProps> = memo(
  ({
    label = 'Pressable list component',
    handler,
    leftIconName = 'information-outline',
  }) => {
    const {colors} = useTheme();
    const onPress = handler && handler.onPress;

    return (
      <View
        style={[
          {
            paddingHorizontal: Indent.L,
            paddingVertical: Indent.XL,
            backgroundColor: colors.card,
            borderRadius: CornerRadius.M,
            gap: Indent.L,
          },
          CommonStyles.shadow,
        ]}>
        <TouchableOpacity disabled={!handler} onPress={onPress}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', gap: Indent.L}}>
              <Icon
                name={leftIconName}
                size={IconSize.S}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: FontSize.S,
                  color: colors.primary,
                  fontWeight: '500',
                }}>
                {label}
              </Text>
            </View>
            {handler && (
              <Icon
                name={handler.iconName}
                size={IconSize.S}
                color={colors.primary}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

export default PressableListComponent;
