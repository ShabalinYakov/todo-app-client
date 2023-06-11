import { makeAutoObservable } from 'mobx';

import { Priority } from '..';

export class PrioritiesStore {
  isLoading = false;
  priorities: Priority[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
