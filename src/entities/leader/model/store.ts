import { makeAutoObservable, runInAction } from 'mobx';

import { Subordinate } from './types';

import { leaderApi } from '../api';

export class LeaderStore {
  isLoading = false;
  subordinates: Subordinate[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  reset() {
    this.subordinates = [];
  }

  loadSubordinates = async () => {
    this.setLoading(true);
    try {
      const subordinates = await leaderApi.getSubordinates();
      runInAction(() => {
        this.subordinates = subordinates;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

}
