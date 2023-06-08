import { makeAutoObservable, runInAction } from 'mobx';

import { type Viewer, type AuthResponseError, type AuthPayload } from './types';

import { sessionApi } from '../api';
import { localStorageSession } from '../lib';

export class SessionStore {
  isAuthLoading = true;
  isAuth = false;
  viewer = {} as Viewer;
  error: AuthResponseError = {};

  constructor() {
    makeAutoObservable(this);
  }

  setAuthLoading(bool: boolean) {
    this.isAuthLoading = bool;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setError(dataError: AuthResponseError) {
    this.error = dataError;
  }

  setViewer(data: Viewer) {
    this.viewer = { ...data };
  }

  removeError() {
    this.error = {};
  }

  get getError() {
    return this.error;
  }

  login = async ({ login, password }: AuthPayload) => {
    try {
      const { data } = await sessionApi.login({ login, password });

      runInAction(() => {
        if (data.error.code) return this.setError(data.error);

        this.setAuth(true);
        this.removeError();
        this.setViewer(data.user);
        localStorageSession.setToken(data.accessToken);
      });
    } catch (error: unknown) {
      console.log(error);
    } finally {
      this.setAuthLoading(false);
    }
  };

  async checkAuth() {
    const isToken = localStorageSession.getToken();
    if (!isToken) return;

    try {
      const { data } = await sessionApi.refresh();

      this.setAuth(true);
      this.setViewer(data.user);
      localStorageSession.setToken(data.accessToken);
    } catch (error) {
      console.log('login error');
    } finally {
      this.setAuthLoading(false);
    }
  }
}
