import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootScreenWrapper from '@components/wrappers/RootScreenWrapper.tsx';
import {FlatList, Text, View} from 'react-native';
import {CornerRadius, Indent} from '@theme/DimensionValues.ts';
import {CommunicationStackParamList} from '@navigation/stacks/CommunicationStack.tsx';
import {useTheme} from '@react-navigation/native';
import UserListItem from '@components/listItems/UserListItem.tsx';
import {useUserSIOStore} from '@utils/zustand/UserSIOStore.ts';
import {socket} from '@api/socket.ts';
import {readOne, SK} from '@utils/storage/mmkvStorage.ts';
import {CommonStyles} from '@theme/CommonStyles.ts';

type Props = NativeStackScreenProps<
  CommunicationStackParamList,
  'CommunicationScreen'
>;

const CommunicationScreen: React.FC<Props> = ({navigation}) => {
  const theme = useTheme();
  const {users} = useUserSIOStore();

  const onUserItemPressed = (userID: string, name: string) => {
    const ownerName = readOne(SK.name);
    if (socket.id && ownerName) {
      navigation.navigate('ChatScreen', {
        recipient: {id: userID, name},
        sender: {id: socket.id, name: ownerName},
      });
    }
  };

  return (
    <RootScreenWrapper
      style={{justifyContent: 'center', padding: Indent.L, gap: Indent.L}}>
      <View
        style={{
          flexDirection: 'row-reverse',
          gap: Indent.M,
          alignItems: 'center',
        }}>
        <View
          style={[
            {
              backgroundColor: socket.disconnected ? 'red' : 'green',
              padding: Indent.L,
              borderRadius: CornerRadius.XL,
              borderWidth: 1,
              borderColor: theme.colors.card,
            },
            CommonStyles.shadow,
          ]}
        />
        <Text>
          Status: {socket.disconnected ? 'disconnected' : 'connected'}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{gap: Indent.M, padding: Indent.M}}
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <UserListItem
            item={item}
            key={index}
            onPress={(): void => onUserItemPressed(item.userID, item.username)}
          />
        )}
      />
    </RootScreenWrapper>
  );
};

export default CommunicationScreen;
