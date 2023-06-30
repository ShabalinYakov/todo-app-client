import { ResponsiblePayload, ResponsibleResponse, Subordinate, Task } from '../model/types';

import { baseApi } from 'shared/api';

const getSubordinates = async (): Promise<Subordinate[]> => {
  const { data } = await baseApi.get('/leader/subordinates');
  return data;
};

const getTasksSubordinateById = async (id: string): Promise<Task[]> => {
  const { data } = await baseApi.get(`/tasks/subordinate/${id}`);
  return data;
};

const updateResponsibleTask = async (payload: ResponsiblePayload): Promise<ResponsibleResponse> => {
  const { data } = await baseApi.patch('/tasks/responsible', payload);
  return data;
};

export const leaderApi = { getSubordinates, getTasksSubordinateById, updateResponsibleTask };
