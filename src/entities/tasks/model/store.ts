import { makeAutoObservable, runInAction } from 'mobx';

import { Task } from './types';

import { tasksApi } from '../api';

export class TasksStore {
  isLoading = false;
  tasksViewer: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  loadViewerTasks = async () => {
    this.setLoading(true);
    try {
      const tasks = await tasksApi.getTasks();
      runInAction(() => {
        this.tasksViewer = tasks;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  getTaskById(id: string) {
    return this.tasksViewer.find((task) => task.id === id);
  }
}
