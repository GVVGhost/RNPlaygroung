import axiosInstance from '@api/apiHelper.ts';
import {HttpStatusCode} from 'axios';
import {TaskContainerObj} from '@utils/data/TaskTypes.ts';
import Toast from 'react-native-root-toast';
import {toastWarningOptions} from '@utils/notifications/Toast.ts';

export const getOneTask = async (
  uuid: string,
): Promise<TaskContainerObj[] | null> => {
  const errorMap = new Map<number, string>([[400, 'Bad request']]);
  let res = await axiosInstance({
    method: 'GET',
    url: '/get_task_by_id',
    params: {filter: JSON.stringify(uuid)},
  });
  // await delay(1000);
  if (res.status !== HttpStatusCode.Ok) {
    Toast.show(
      res.message || errorMap.get(res.status) || 'Failed to get task by id',
      toastWarningOptions,
    );
    return null;
  }
  return res.data;
};

export const getManyTasks = async (
  id: string,
): Promise<TaskContainerObj[] | null> => {
  const errorMap = new Map<number, string>([[400, 'Bad request']]);
  // await delay(1000);
  let res = await axiosInstance({
    method: 'GET',
    url: '/get_tasks',
    params: {id},
    // params: {filter: JSON.stringify({id})},
  });
  if (res.status !== HttpStatusCode.Ok) {
    Toast.show(
      res.message || errorMap.get(res.status) || 'Failed to get tasks',
      toastWarningOptions,
    );
    return null;
  }
  return res.data;
};

export const uploadTask = async (
  task: TaskContainerObj,
  config:
    | {method: 'PUT'; url: '/update_task'}
    | {method: 'POST'; url: '/create_task'},
): Promise<TaskContainerObj[] | null> => {
  const errorMap = new Map<number, string>([[400, 'Bad request']]);
  // await delay(1000);
  let res = await axiosInstance({
    method: config.method,
    url: config.url,
    data: task,
  });
  if (res.status !== HttpStatusCode.Ok) {
    Toast.show(
      res.message || errorMap.get(res.status) || 'Failed to upload task',
      toastWarningOptions,
    );
    return null;
  }
  return res.data;
};

export const deleteTask = async (uuid: string): Promise<string[] | null> => {
  const errorMap = new Map<number, string>([[400, 'Bad request']]);
  // await delay(1000);
  let res = await axiosInstance({
    method: 'DELETE',
    url: '/delete_task',
    params: {uuid},
  });
  if (res.status !== HttpStatusCode.Ok) {
    Toast.show(
      res.message || errorMap.get(res.status) || 'Failed to delete task',
      toastWarningOptions,
    );
    return null;
  }
  return res.data;
};
