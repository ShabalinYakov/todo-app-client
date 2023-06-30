import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from 'app';

interface Props {
  children: React.ReactNode;
}

const _ResponsiblesLoader = ({ children }: Props) => {
  const { sessionStore, leaderStore } = useStore();

  useEffect(() => {
    if (sessionStore.viewer.is_leader && leaderStore.subordinates.length === 0) {
      leaderStore.loadSubordinates();
    }
  }, [sessionStore, leaderStore]);

  return <>{children}</>;
};

export const ResponsiblesLoader = observer(_ResponsiblesLoader);
