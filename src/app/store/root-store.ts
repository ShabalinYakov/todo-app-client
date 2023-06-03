import { SessionStore } from 'entities/session';

export class RootStore {
  viewerStore = new SessionStore();
}
