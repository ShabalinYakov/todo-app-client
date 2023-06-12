import { makeAutoObservable, runInAction } from 'mobx';

import { Task } from './types';

import { tasksApi } from '../api';
import { getEndOfDayInMs, getEndOfWeekInMs } from '../lib/date-helpers';

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

  get tasksForToday() {
    const dayEnd = getEndOfDayInMs();

    return this.tasks
      .filter((task) => Date.parse(task.deadline) < dayEnd)
      .sort((prevTask, nextTask) => Date.parse(prevTask.deadline) - Date.parse(nextTask.deadline));
  }

  get tasksForWeek() {
    const dayEnd = getEndOfDayInMs();
    const weekEnd = getEndOfWeekInMs();
    return this.tasks
      .filter((task) => Date.parse(task.deadline) > dayEnd && Date.parse(task.deadline) < weekEnd)
      .sort((prevTask, nextTask) => Date.parse(prevTask.deadline) - Date.parse(nextTask.deadline));
  }

  get tasksForFuture() {
    const weekEnd = getEndOfWeekInMs();
    return this.tasks
      .filter((task) => Date.parse(task.deadline) > weekEnd)
      .sort((prevTask, nextTask) => Date.parse(prevTask.deadline) - Date.parse(nextTask.deadline));
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

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
}
