import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from 'app';

interface Props {
  isLeader: boolean;
  children: React.ReactNode;
}

const _SubordinatesLoader = ({ isLeader, children }: Props) => {
  const { leaderStore } = useStore();

  useEffect(() => {
    if (isLeader && leaderStore.subordinates.length === 0) {
      leaderStore.loadSubordinates();
    }
  }, [isLeader, leaderStore]);

  if (leaderStore.subordinates.length === 0) {
    return <h3>Загрузка...</h3>;
  }
  return <>{children}</>;
};

export const SubordinatesLoader = observer(_SubordinatesLoader);
