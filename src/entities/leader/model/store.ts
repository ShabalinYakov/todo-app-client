import { makeAutoObservable, runInAction } from 'mobx';

import { Subordinate, Task } from './types';

import { leaderApi } from '../api';

export class LeaderStore {
  isLoading = false;
  subordinates: Subordinate[] = [];
  tasksSubordinate: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
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

  loadTasksSubordinateById = async (id: string) => {
    this.setLoading(true);
    try {
      const tasksSubordinates = await leaderApi.getTasksSubordinateById(id);
      runInAction(() => {
        this.tasksSubordinate = tasksSubordinates;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
