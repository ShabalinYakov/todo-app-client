import { setupInterceptors } from './interceptors';

import { type AuthPayload, type AuthResponse } from '../model/types';

import { baseApi } from 'shared/api';

setupInterceptors(baseApi);

const login = async ({ login, password }: AuthPayload) => {
  return await baseApi.post<AuthResponse>('auth/login/', { login, password });
};

const refresh = async () => {
  return await baseApi.get<AuthResponse>('auth/refresh', { withCredentials: true });
};

const logout = async () => {
  await baseApi.post('auth/logout');
};

export const sessionApi = { login, refresh, logout };
