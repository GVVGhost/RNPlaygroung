import HomeStack, {HomeStackParamList} from '@navigation/stacks/HomeStack.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsStack, {
  SettingsStackParamList,
} from '@navigation/stacks/SettingsStack.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import CommunicationStack, {
  CommunicationStackParamList,
} from '@navigation/stacks/CommunicationStack.tsx';
import {SafeAreaView} from 'react-native';
import {useEffect} from 'react';
import {readOne, SK} from '@utils/storage/mmkvStorage.ts';
import {initReactiveProperties, socket} from '@api/socket.ts';
import Toast from 'react-native-root-toast';
import {toastErrorOptions} from '@utils/notifications/Toast.ts';
import {
  IncomingPrivateMessageObj,
  UserResponseObj,
} from '@utils/data/CommunicationTypes.ts';
import {useUserSIOStore} from '@utils/zustand/UserSIOStore.ts';

export type BottomNavBarProps = {
  HomeStack: HomeStackParamList;
  SettingsStack: SettingsStackParamList;
  CommunicationsStack: CommunicationStackParamList;
};

const {Navigator, Screen} = createBottomTabNavigator<BottomNavBarProps>();

const BottomNavBar = () => {
  const {colors} = useTheme();
  const {setUsers, getOneUser, addUsers, addMessageToUser} = useUserSIOStore();

  useEffect(() => {
    const username = readOne(SK.name);
    socket.auth = {username};
    socket.connect();

    function connectErrorHandler(err: any) {
      if (err.message === 'invalid_username') {
        Toast.show(
          'Invalid or no username provided. Try to re-login',
          toastErrorOptions,
        );
      }
    }

    function onConnect() {
      // TODO
    }

    function onDisconnect() {
      // TODO
    }

    function onUsersEventHandler(users: UserResponseObj[]) {
      setUsers(
        users.map(initReactiveProperties).sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        }),
      );
    }

    function onConnectsEventHandler(user: UserResponseObj) {
      addUsers([initReactiveProperties(user)]);
    }

    function onDisconnectsEventHandler(id: string) {
      let userToChange = getOneUser(id);
      if (userToChange) {
        setUsers([{...userToChange, connected: false}]);
      }
    }

    function onPrivateMessageEvent(msg: IncomingPrivateMessageObj) {
      console.log('incoming msg', msg);
      console.log('socket.id', socket.id);
      if (socket.id) {
        addMessageToUser(
          msg.from,
          {content: msg.content, from: msg.from, to: socket.id},
          true,
        );
      }
    }

    socket.on('connect_error', connectErrorHandler);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('users', onUsersEventHandler);
    socket.on('user_connected', onConnectsEventHandler);
    socket.on('user_disconnected', onDisconnectsEventHandler);
    socket.on('private_message', onPrivateMessageEvent);

    return () => {
      socket.off('connect_error', connectErrorHandler);
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('users', onUsersEventHandler);
      socket.off('user_connected', onConnectsEventHandler);
      socket.off('user_disconnected', onDisconnectsEventHandler);
      socket.off('private_message', onPrivateMessageEvent);
      socket.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderColor: colors.background,
            elevation: 0,
            height: 40,
          },
        }}>
        <Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="CommunicationsStack"
          component={CommunicationStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="application-edit-outline" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="cog" color={color} size={size} />
            ),
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
};

export default BottomNavBar;
