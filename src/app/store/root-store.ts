import { SessionStore } from 'entities/session';

export class RootStore {
  sessionStore = new SessionStore();
}
