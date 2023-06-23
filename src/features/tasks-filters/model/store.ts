import { makeAutoObservable } from 'mobx';

import { Task } from './types';

import { getEndOfDayInMs, getEndOfWeekInMs } from '../lib/date-helpers';

import { FilterConfig } from 'entities/tasks';

export class TasksFilterStore {
  tasks: Task[] = [];
  filterConfig: FilterConfig = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(data: Task[]) {
    this.tasks = data;
  }

  setFilterConfig(config: FilterConfig) {
    this.filterConfig = config;
  }

  get filteredTasks() {
    switch (this.filterConfig) {
      case 'all':
        return this.tasks;
      case 'forToday': {
        const dayEnd = getEndOfDayInMs();

        return this.tasks
          .filter((task) => Date.parse(task.deadline) < dayEnd)
          .sort((prevTask, nextTask) => Date.parse(prevTask.deadline) - Date.parse(nextTask.deadline));
      }
      case 'forWeek': {
        const dayEnd = getEndOfDayInMs();
        const weekEnd = getEndOfWeekInMs();
        return this.tasks
          .filter((task) => Date.parse(task.deadline) > dayEnd && Date.parse(task.deadline) < weekEnd)
          .sort((prevTask, nextTask) => Date.parse(prevTask.deadline) - Date.parse(nextTask.deadline));
      }
      case 'forFuture': {
        const weekEnd = getEndOfWeekInMs();
        return this.tasks
          .filter((task) => Date.parse(task.deadline) > weekEnd)
          .sort((prevTask, nextTask) => Date.parse(prevTask.deadline) - Date.parse(nextTask.deadline));
      }
      default:
        return this.tasks;
    }
  }

  reset = () => {
    this.filterConfig = 'all';
    this.tasks = [];
  };
}
