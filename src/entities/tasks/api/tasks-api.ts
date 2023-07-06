import {
  Task,
  TaskPayload,
  StatusResponse,
  StatusPayload,
  TitleData,
  DeadlineData,
  DescriptionData,
  PriorityPayload,
  PriorityResponse,
  ResponsiblePayload,
  ResponsibleResponse,
} from '../model/types';

import { baseApi } from 'shared/api';

const getTasks = async (): Promise<Task[]> => {
  const { data } = await baseApi.get('tasks');
  return data;
};

const getTasksSubordinateById = async (id: string): Promise<Task[]> => {
  const { data } = await baseApi.get(`/tasks/subordinate/${id}`);
  return data;
};

const createTask = async (payload: TaskPayload): Promise<Task> => {
  const { data } = await baseApi.post('/tasks', payload);
  return data;
};

const updateTitle = async (payload: TitleData): Promise<TitleData> => {
  const { data } = await baseApi.patch<TitleData>('/tasks/title', payload);
  return data;
};

const updateDeadline = async (payload: DeadlineData): Promise<DeadlineData> => {
  const { data } = await baseApi.patch<DeadlineData>('/tasks/deadline', payload);
  return data;
};

const updateDescription = async (payload: DescriptionData): Promise<DescriptionData> => {
  const { data } = await baseApi.patch<DescriptionData>('/tasks/description', payload);
  return data;
};

const updatePriority = async (payload: PriorityPayload): Promise<PriorityResponse> => {
  const { data } = await baseApi.patch<PriorityResponse>('/tasks/priority', payload);
  return data;
};

const updateStatus = async (payload: StatusPayload): Promise<StatusResponse> => {
  const { data } = await baseApi.patch<StatusResponse>('tasks/status', payload);
  return data;
};

const updateResponsibleTask = async (payload: ResponsiblePayload): Promise<ResponsibleResponse> => {
  const { data } = await baseApi.patch('/tasks/responsible', payload);
  return data;
};

export const tasksApi = {
  getTasks,
  createTask,
  updateTitle,
  updateStatus,
  updateDeadline,
  updatePriority,
  updateDescription,
  updateResponsibleTask,
  getTasksSubordinateById,
};
