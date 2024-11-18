import axiosInstance from '@api/apiHelper.ts';
import {HttpStatusCode} from 'axios';
import {AuthResObj} from '@utils/data/AuthTypes.ts';
import Toast from 'react-native-root-toast';
import {toastWarningOptions} from '@utils/notifications/Toast.ts';

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
    Toast.show(res.message || errorMap.get(res.status) || 'Login failed', toastWarningOptions);
    return null;
  }
  return res.data;
};
