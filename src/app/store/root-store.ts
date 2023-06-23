import { autorun } from 'mobx';

import { TasksFilterStore } from 'features/tasks-filters';

import { LeaderStore } from 'entities/leader';
import { PrioritiesStore } from 'entities/priorities';
import { SessionStore } from 'entities/session';
import { StatusesStore } from 'entities/statuses';
import { TasksStore } from 'entities/tasks';

export class RootStore {
  sessionStore = new SessionStore();
  tasksStore = new TasksStore();
  prioritiesStore = new PrioritiesStore();
  statusesStore = new StatusesStore();
  leaderStore: LeaderStore | undefined;

  filtersStore = new TasksFilterStore();

  constructor() {
    autorun(() => {
      if (this.sessionStore.viewer.is_leader) {
        this.leaderStore = new LeaderStore();
      }
    });
  }
}
