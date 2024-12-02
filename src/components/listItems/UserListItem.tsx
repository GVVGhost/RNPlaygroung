import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  CornerRadius,
  FontSize,
  IconSize,
  Indent,
} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {UserObj} from '@utils/data/CommunicationTypes.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonStyles} from '@theme/CommonStyles.ts';

export interface UserListItemProps {
  item: UserObj;
  onPress: () => void;
}

const UserListItem: React.FC<UserListItemProps> = memo(({item, onPress}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: Indent.L,
          paddingHorizontal: Indent.XL,
          paddingVertical: Indent.M,
          borderRadius: CornerRadius.XL,
          backgroundColor: colors.card,
        },
        CommonStyles.shadow,
      ]}>
      <View style={{flexDirection: 'column', alignItems: 'baseline'}}>
        <Text
          style={{
            fontSize: FontSize.M,
            fontWeight: 'bold',
            color: colors.text,
            textAlign: 'center',
          }}>
          {item.username} {item.self && ' (yourself)'}
        </Text>
        {!item.self && (
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: Indent.L}}>
            <View
              style={[
                {
                  backgroundColor: item.connected ? 'green' : 'red',
                  padding: Indent.L,
                  borderRadius: CornerRadius.XL,
                  borderWidth: 1,
                  borderColor: colors.card,
                },
                CommonStyles.shadow,
              ]}
            />
            <Text
              style={{
                fontSize: FontSize.M,
                color: colors.text,
                textAlign: 'center',
              }}>
              {item.connected ? 'online' : 'offline'}
            </Text>
          </View>
        )}
      </View>
      <Icon
        name={'chevron-right'}
        size={IconSize.M}
        color={colors.background}
      />
    </TouchableOpacity>
  );
});

export default UserListItem;
