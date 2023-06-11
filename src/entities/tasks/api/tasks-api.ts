import { Task } from '../model/types';

import { baseApi } from 'shared/api';

const getTasks = async (): Promise<Task[]> => {
  const { data } = await baseApi.get('tasks');
  return data;
};

export const tasksApi = { getTasks };
