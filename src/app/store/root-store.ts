import { PrioritiesStore } from 'entities/priorities';
import { SessionStore } from 'entities/session';
import { TasksStore } from 'entities/tasks';

export class RootStore {
  sessionStore = new SessionStore();
  tasksStore = new TasksStore();
  prioritiesStore = new PrioritiesStore();
}
