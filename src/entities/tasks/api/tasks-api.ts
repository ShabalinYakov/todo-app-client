import { Task } from '../model/types';

import { baseApi } from 'shared/api';

const getTasks = async (): Promise<Task[]> => {
  const { data } = await baseApi.get('tasks');
  return data;
};

const getTasksSubordinates = async (): Promise<Task[]> => {
  const { data } = await baseApi.get('/leader/tasks-subordinates');
  return data;
};

export const tasksApi = { getTasks, getTasksSubordinates };
