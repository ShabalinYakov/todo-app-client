import { sessionApi } from './session-api';

import { localStorageSession } from '../lib';

import { baseApi } from 'shared/api';

baseApi.interceptors.request.use(
  (config) => {
    const token = localStorageSession.getToken();
    if (token) config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  async (error) => {
    throw error;
  }
);

baseApi.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest !== false && originalRequest._isRetry !== false) {
      originalRequest._isRetry = true;
      try {
        const { data } = await sessionApi.refresh();
        localStorageSession.setToken(data.accessToken);

        return await baseApi.request(originalRequest);
      } catch (e) {
        throw error;
      }
    }
    throw error;
  }
);
