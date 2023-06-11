import { Priority } from '../model/types';

import { baseApi } from 'shared/api';

const getPriorities = async (): Promise<Priority[]> => {
  const { data } = await baseApi.get('priorities');
  return data;
};

export const prioritiesApi = { getPriorities };
