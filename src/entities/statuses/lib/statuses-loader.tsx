import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from 'app';

interface Props {
  children: React.ReactNode;
}

const _StatusesLoader = ({ children }: Props) => {
  const { statusesStore } = useStore();

  useEffect(() => {
    if (statusesStore.statuses.length === 0) {
      statusesStore.loadStatuses();
    }
  }, [statusesStore]);

  return <>{children}</>;
};

export const StatusesLoader = observer(_StatusesLoader);
