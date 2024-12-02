import {create} from 'zustand';
import {PrivateMessageObj, UserObj} from '@utils/data/CommunicationTypes.ts';

export type UserSIOStore = {
  users: UserObj[];
  setUsers: (users: UserObj[]) => void;
  addUsers: (users: UserObj[]) => void;
  removeUsers: (userIDs: string[]) => void;
  updateUser: (user: UserObj) => void;
  getOneUser: (userID: string) => UserObj | undefined;
  addMessageToUser: (userID: string, messages: PrivateMessageObj, setReadStatus: boolean) => void;
  changeUnreadMessagesStatus: (userID: string, toStatus: boolean) => void;
};

export const useUserSIOStore = create<UserSIOStore>()((set, getState) => ({
  users: [],
  setUsers: users => set(() => ({users: users})),
  addUsers: users => set(state => ({users: [...state.users, ...users]})),
  removeUsers: userIDs =>
    set(state => ({
      users: state.users.filter(user => userIDs.includes(user.userID)),
    })),
  updateUser: user =>
    set(state => ({
      users: state.users.map(usr => (usr.userID === user.userID ? user : usr)),
    })),
  getOneUser: userID => getState().users.find(user => user.userID === userID),
  addMessageToUser: (userID: string, message: PrivateMessageObj, setReadStatus: boolean) =>
    set(state => ({
      users: state.users.map(usr =>
        usr.userID === userID
          ? {...usr, messages: [message, ...usr.messages], hasNewMessages: setReadStatus}
          : usr,
      ),
    })),
  changeUnreadMessagesStatus: (userID: string, toStatus: boolean) =>
    set(state => ({
      users: state.users.map(usr =>
        usr.userID === userID ? {...usr, hasNewMessages: toStatus} : usr,
      ),
    })),
}));
