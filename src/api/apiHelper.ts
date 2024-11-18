import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {readOne, SK} from '@utils/storage/mmkvStorage.ts';

export interface AxiosInstanceResponse<T = any> {
  success: boolean;
  data: T | null;
  message: any | null;
  status: number;
  headers: any | null;
}

const axiosInstance = async <T = any>(
  config: AxiosRequestConfig,
): Promise<AxiosInstanceResponse<T>> => {
  let ans: AxiosInstanceResponse<T> = {
    success: false,
    data: null,
    message: null,
    status: 0,
    headers: null,
  };
  const baseURL = process.env.API_URL;
  if (!baseURL) {
    ans.message = 'Error. The base API URL is missing';
    return ans;
  }
  config.baseURL = baseURL;

  const token = readOne(SK.token);
  if (token) {
    config.headers = {...config.headers, Authorization: `Bearer ${token}`};
  }

  try {
    const res: AxiosResponse<T> = await axios(config);
    ans.headers = res.headers;
    ans.status = res.status;
    ans.data = res.data;
    ans.success = true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        ans.status = err?.response?.status;
        ans.data = err?.response?.data;
        if (ans.status === 500) {
          ans.message = 'Internal Server Error';
        } else if (ans.status === 429) {
          ans.message = 'Session expired. Re-login required';
        }
      } else if (err.request) {
        ans.message = 'Network error. Check internet connection';
      } else {
        ans.message = 'Error. Something went wrong';
      }
    }
  }

  return ans;
};

export default axiosInstance;
