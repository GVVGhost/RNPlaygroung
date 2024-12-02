
export type UserResponseObj = {
  userID: string;
  username: string;
}

export type UserObj = {
  self: boolean;
  userID: string;
  username: string;
  connected: boolean;
  messages: PrivateMessageObj[];
  hasNewMessages: boolean;
};

export type IncomingPrivateMessageObj = {
  content: string;
  from: string;
};

export type OutgoingPrivateMessageObj = {
  content: string;
  to: string;
};

export type PrivateMessageObj = {
  content: string;
  from: string;
  to: string;
}
