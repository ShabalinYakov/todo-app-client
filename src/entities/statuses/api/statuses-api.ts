import { Status } from '../model/types';

import { baseApi } from 'shared/api';

const getStatuses = async (): Promise<Status[]> => {
  const { data } = await baseApi.get('statuses');
  return data;
};

export const statusesApi = { getStatuses };
