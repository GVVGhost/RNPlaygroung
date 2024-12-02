import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {
  BorderWidth,
  CornerRadius,
  Elevation,
  FontSize,
  Indent,
} from '@theme/DimensionValues.ts';
import {useTheme} from '@react-navigation/native';
import {PrivateMessageObj} from '@utils/data/CommunicationTypes.ts';
import {CommonStyles} from '@theme/CommonStyles.ts';

export interface MessageItemProps {
  item: PrivateMessageObj;
  recipient: {id: string; name: string};
  owner: {id: string; name: string};
  onPress: () => void;
}

const MessageItem: React.FC<MessageItemProps> = memo(
  ({item, recipient, owner, onPress}) => {
    const {colors} = useTheme();
    const isFromOwner = item.from === owner.id;

    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: Indent.M,
            paddingHorizontal: Indent.XL,
            paddingVertical: Indent.M,
            borderRadius: CornerRadius.L,
            marginHorizontal: Indent.XS,
            backgroundColor: colors.card,
          },
          CommonStyles.shadow,
          isFromOwner
            ? {
                borderBottomLeftRadius: 0,
                borderColor: colors.primary,
                marginEnd: 45,
              }
            : {
                borderBottomRightRadius: 0,
                borderColor: colors.border,
                marginStart: 45,
              },
        ]}>
        <View
          style={{flexDirection: 'column', alignItems: 'baseline', flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: isFromOwner ? 'row' : 'row-reverse',
            }}>
            <Text
              style={{
                fontSize: FontSize.XS,
                color: colors.border,
                fontWeight: 'bold',
              }}>
              {isFromOwner ? 'You' : recipient.name}
            </Text>
            <View style={{flex: 1}} />
          </View>
          <Text
            style={{
              fontSize: FontSize.S,
              color: colors.text,
            }}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  },
);

export default MessageItem;
