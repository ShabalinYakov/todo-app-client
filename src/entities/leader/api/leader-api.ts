import { Subordinate } from '../model/types';

import { baseApi } from 'shared/api';

const getSubordinates = async (): Promise<Subordinate[]> => {
  const { data } = await baseApi.get('/leader/subordinates');
  return data;
};

export const leaderApi = { getSubordinates };
