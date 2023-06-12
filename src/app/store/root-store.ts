import { PrioritiesStore } from 'entities/priorities';
import { SessionStore } from 'entities/session';
import { StatusesStore } from 'entities/statuses';
import { TasksStore } from 'entities/tasks';

export class RootStore {
  sessionStore = new SessionStore();
  tasksStore = new TasksStore();
  prioritiesStore = new PrioritiesStore();
  statusesStore = new StatusesStore();
}
