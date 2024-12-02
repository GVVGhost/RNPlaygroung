import {io} from 'socket.io-client';
import {Platform} from 'react-native';
import {UserObj, UserResponseObj} from '@utils/data/CommunicationTypes.ts';

const URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

export const socket = io(URL, {autoConnect: false});

export const initReactiveProperties = (user: UserResponseObj): UserObj => ({
  ...user,
  self: user.userID === socket.id,
  connected: true,
  messages: [],
  hasNewMessages: false,
});
