import { SessionStore } from 'entities/session';
import { TasksStore } from 'entities/tasks';

export class RootStore {
  sessionStore = new SessionStore();
  tasksStore = new TasksStore();
}
