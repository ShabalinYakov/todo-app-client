import { useContext } from 'react';

import { type RootStore } from './root-store';
import { RootStoreContext } from './root-store-context';

export const useStore = (): RootStore => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('You have forgotten to wrap your root component with RootStoreProvider');
  }
  return context;
};
