import { makeAutoObservable, runInAction } from 'mobx';

import { Priority } from '..';
import { prioritiesApi } from '../api/priorities-api';

export class PrioritiesStore {
  isLoading = false;
  priorities: Priority[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setPriorities(data: Priority[]) {
    this.priorities = data;
  }

  loadPriorities = async () => {
    this.setLoading(true);
    try {
      const priorities = await prioritiesApi.getPriorities();
      runInAction(() => {
        this.setPriorities(priorities);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
