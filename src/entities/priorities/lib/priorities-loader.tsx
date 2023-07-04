import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from 'app';

interface Props {
  children: React.ReactNode;
}

const _PrioritiesLoader = ({ children }: Props) => {
  const { prioritiesStore } = useStore();

  useEffect(() => {
    if (prioritiesStore.priorities.length === 0) {
      prioritiesStore.loadPriorities();
    }
  }, [prioritiesStore]);

  return <>{children}</>;
};

export const PrioritiesLoader = observer(_PrioritiesLoader);
