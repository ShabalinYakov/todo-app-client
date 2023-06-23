import { Subordinate, Task } from '../model/types';

import { baseApi } from 'shared/api';

const getSubordinates = async (): Promise<Subordinate[]> => {
  const { data } = await baseApi.get('/leader/subordinates');
  return data;
};

const getTasksSubordinatesById = async (id: string): Promise<Task[]> => {
  const { data } = await baseApi.get(`/leader/tasks-subordinates/${id}`);
  return data;
};

export const leaderApi = { getSubordinates, getTasksSubordinatesById };
