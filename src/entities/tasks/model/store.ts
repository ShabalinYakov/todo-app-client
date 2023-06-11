import { makeAutoObservable, runInAction } from 'mobx';

import { Task } from './types';

import { tasksApi } from '../api';

export class TasksStore {
  isLoading = false;
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setTasks(data: Task[]) {
    this.tasks = data;
  }

  loadTasks = async () => {
    this.setLoading(true);
    try {
      const tasks = await tasksApi.getTasks();
      runInAction(() => {
        this.setTasks(tasks);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
