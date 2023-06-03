import { makeAutoObservable } from 'mobx';

import { type Viewer, type AuthResponseError } from './types';

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
}
