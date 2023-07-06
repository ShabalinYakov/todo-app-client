import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { sessionApi } from './session-api';

import { localStorageSession } from '../lib';

import { baseApi } from 'shared/api';

interface RetryConfig extends InternalAxiosRequestConfig {
  _isRetry: boolean;
}

const onRequest = async (config: InternalAxiosRequestConfig) => {
  const token = localStorageSession.getToken();
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
};

const onRequestError = async (error: AxiosError) => {
  throw error;
};

const onResponse = async (response: AxiosResponse) => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  const originalRequest = error.config as RetryConfig;
  if (error?.response?.status === 401 && originalRequest && originalRequest._isRetry === false) {
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
};

export const setupInterceptors = (baseApi: AxiosInstance) => {
  baseApi.interceptors.request.use(onRequest, onRequestError);
  baseApi.interceptors.response.use(onResponse, onResponseError);
};
