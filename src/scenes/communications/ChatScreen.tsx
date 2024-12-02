import React, {useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommunicationStackParamList} from '@navigation/stacks/CommunicationStack.tsx';
import {
  BorderWidth,
  CornerRadius,
  FontSize,
  Indent,
} from '@theme/DimensionValues.ts';
import RoundedIconButton from '@components/buttons/RoundedIconButton.tsx';
import {useTheme} from '@react-navigation/native';
import {useUserSIOStore} from '@utils/zustand/UserSIOStore.ts';
import MessageItem from '@components/listItems/MessageItem.tsx';
import {socket} from '@api/socket.ts';
import {CommonStyles} from '@theme/CommonStyles.ts';

type Props = NativeStackScreenProps<CommunicationStackParamList, 'ChatScreen'>;
const ChatScreen: React.FC<Props> = ({navigation, route}) => {
  const theme = useTheme();
  const {getOneUser, addMessageToUser} = useUserSIOStore();
  const {sender, recipient} = route.params;
  const [message, setMessage] = useState<string>('');
  let recipientObj = getOneUser(recipient.id);

  function navigateBack() {
    navigation.goBack();
  }

  function sendMessage() {
    if (message.length === 0 || socket.disconnected) return;
    socket.emit('private_message', {content: message, to: recipient.id});
    addMessageToUser(
      recipient.id,
      {content: message, to: recipient.id, from: sender.id},
      false,
    );
    setMessage('');
  }

  return (
    <RootScreenWrapper style={{gap: Indent.S}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: Indent.L,
          gap: Indent.M,
          alignItems: 'center',
        }}>
        <RoundedIconButton iconName={'arrow-left'} onPress={navigateBack} />
        <View style={{flex: 1}} />
        <Text
          style={{
            fontSize: FontSize.M,
            color: theme.colors.primary,
            fontWeight: 'bold',
          }}>
          {sender.id === recipient.id
            ? 'Personal Notes'
            : `Chat with ${route.params.recipient.name}`}
        </Text>
        <View
          style={[
            {
              backgroundColor: recipientObj?.connected ? 'green' : 'red',
              padding: Indent.L,
              borderRadius: CornerRadius.XL,
              borderWidth: 1,
              borderColor: theme.colors.card,
            },
            CommonStyles.shadow,
          ]}
        />
      </View>
      <FlatList
        contentContainerStyle={{gap: Indent.M, padding: Indent.M}}
        data={recipientObj?.messages || []}
        keyExtractor={(item, index) => index.toString()}
        inverted={true}
        renderItem={({item, index}) => (
          <MessageItem
            key={index}
            item={item}
            recipient={route.params.recipient}
            owner={route.params.sender}
            onPress={() => {}}
          />
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: Indent.M,
          marginBottom: Indent.XL,
          gap: Indent.L,
          maxHeight: 100,
        }}>
        <TextInput
          placeholderTextColor={theme.colors.text}
          placeholder={
            sender.id === recipient.id ? 'Type a note...' : 'Type a message...'
          }
          multiline={true}
          scrollEnabled={true}
          numberOfLines={3}
          value={message}
          onChangeText={setMessage}
          style={[
            {
              flex: 1,
              paddingHorizontal: Indent.L,
              alignItems: 'baseline',
              alignSelf: 'center',
              padding: Indent.L,
              borderRadius: CornerRadius.L,
              fontSize: FontSize.S,
              fontWeight: '400',
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
              borderWidth: BorderWidth.L,
            },
            CommonStyles.shadow,
          ]}
        />
        <View>
          <RoundedIconButton iconName={'send'} onPress={sendMessage} />
        </View>
      </View>
    </RootScreenWrapper>
  );
};

export default ChatScreen;
