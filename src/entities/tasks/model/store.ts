import { makeAutoObservable, runInAction } from 'mobx';

import {
  DeadlineData,
  DescriptionData,
  PriorityPayload,
  ResponsiblePayload,
  StatusPayload,
  Task,
  TaskPayload,
  TitleData,
} from './types';

import { tasksApi } from '../api';

export class TasksStore {
  isLoading = false;
  tasksViewer: Task[] = [];
  tasksSubordinate: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this.tasksViewer = [];
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

  loadTasksSubordinateById = async (id: string) => {
    this.setLoading(true);
    try {
      const tasksSubordinates = await tasksApi.getTasksSubordinateById(id);
      runInAction(() => {
        this.tasksSubordinate = tasksSubordinates;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  createTask = async (viewerId: string, payload: TaskPayload) => {
    this.setLoading(true);
    try {
      const task = await tasksApi.createTask(payload);
      runInAction(() => {
        if (viewerId === task.responsible.id) {
          this.tasksViewer.push(task);
        } else {
          this.tasksSubordinate.push(task);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateStatus = async ({ task_id, status }: StatusPayload) => {
    this.setLoading(true);
    try {
      const response = await tasksApi.updateStatus({ task_id, status });
      runInAction(() => {
        const findTask = this.tasksViewer.some((t) => t.id === task_id);
        if (findTask) {
          this.tasksViewer.forEach((t) => {
            if (t.id === task_id) {
              t.status = response.name;
            }
          });
        } else {
          this.tasksSubordinate.forEach((t) => {
            if (t.id === task_id) {
              t.status = response.name;
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateTitle = async ({ task_id, title }: TitleData) => {
    this.setLoading(true);
    try {
      const response = await tasksApi.updateTitle({ task_id, title });
      runInAction(() => {
        const findTask = this.tasksViewer.some((t) => t.id === task_id);
        if (findTask) {
          this.tasksViewer.forEach((task) => {
            if (task.id === task_id) {
              task.title = response.title;
            }
          });
        } else {
          this.tasksSubordinate.forEach((task) => {
            if (task.id === task_id) {
              task.title = response.title;
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateDeadline = async ({ task_id, deadline }: DeadlineData) => {
    this.setLoading(true);
    try {
      const response = await tasksApi.updateDeadline({ task_id, deadline });
      runInAction(() => {
        const findTask = this.tasksViewer.some((t) => t.id === task_id);
        if (findTask) {
          this.tasksViewer.forEach((task) => {
            if (task.id === task_id) {
              task.deadline = response.deadline;
            }
          });
        } else {
          this.tasksSubordinate.forEach((task) => {
            if (task.id === task_id) {
              task.deadline = response.deadline;
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateDescription = async ({ task_id, description }: DescriptionData) => {
    this.setLoading(true);
    try {
      const response = await tasksApi.updateDescription({ task_id, description });
      runInAction(() => {
        const findTask = this.tasksViewer.some((t) => t.id === task_id);
        if (findTask) {
          this.tasksViewer.forEach((task) => {
            if (task.id === task_id) {
              task.description = response.description;
            }
          });
        } else {
          this.tasksSubordinate.forEach((task) => {
            if (task.id === task_id) {
              task.description = response.description;
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updatePriority = async ({ task_id, priority }: PriorityPayload) => {
    this.setLoading(true);
    try {
      const response = await tasksApi.updatePriority({ task_id, priority });
      runInAction(() => {
        const findTask = this.tasksViewer.some((t) => t.id === task_id);
        if (findTask) {
          this.tasksViewer.forEach((task) => {
            if (task.id === task_id) {
              task.priority = response.name;
            }
          });
        } else {
          this.tasksSubordinate.forEach((task) => {
            if (task.id === task_id) {
              task.priority = response.name;
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateResponsibleTask = async ({ task_id, responsible }: ResponsiblePayload) => {
    this.setLoading(true);
    try {
      const response = await tasksApi.updateResponsibleTask({ task_id, responsible });
      runInAction(() => {
        const findTask = this.tasksViewer.some((t) => t.id === task_id);
        if (findTask) {
          this.tasksViewer.forEach((task) => {
            if (task.id === task_id) {
              task.responsible.name = response.name;
              this.tasksSubordinate.push(task);
            }
          });
          this.tasksViewer = this.tasksViewer.filter((t) => t.id !== task_id);
          return;
        }
        this.tasksSubordinate.forEach((task) => {
          if (task.id === task_id) {
            task.responsible.name = response.name;
            this.tasksViewer.push(task);
          }
        });
        this.tasksSubordinate = this.tasksSubordinate.filter((t) => t.id !== task_id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
