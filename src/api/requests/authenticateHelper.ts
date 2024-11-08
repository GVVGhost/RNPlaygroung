import axiosInstance from '@api/apiHelper.ts';
import {HttpStatusCode} from 'axios';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {AuthResObj} from '@utils/data/AuthTypes.ts';

export const authenticate = async (
  url: '/login' | '/register',
  data: {
    email: string;
    password: string;
    name?: string;
  },
): Promise<AuthResObj | null> => {
  const errorMap = new Map<number, string>([
    [400, 'Incorrect credentials'],
    [404, 'There is no user found with that email'],
    [403, 'Invalid password'],
    [409, 'User already exists'],
  ]);
  let res = await axiosInstance({
    method: 'POST',
    url,
    data,
  });
  if (res.status !== HttpStatusCode.Ok) {
    const textBody = res.message || errorMap.get(res.status) || 'Login failed';
    Toast.show({type: ALERT_TYPE.WARNING, textBody});
    return null;
  }
  return res.data;
};
