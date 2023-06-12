import { makeAutoObservable, runInAction } from 'mobx';

import { type Status } from './types';

import { statusesApi } from '../api';

export class StatusesStore {
  isLoading = false;
  statuses: Status[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setStatuses(data: Status[]) {
    this.statuses = data;
  }

  loadStatuses = async () => {
    this.setLoading(true);
    try {
      const statuses = await statusesApi.getStatuses();
      runInAction(() => {
        this.setStatuses(statuses);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
