import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useStore } from 'app';

const _Logout = () => {
  const { sessionStore, leaderStore, tasksStore } = useStore();

  useEffect(() => {
    if (sessionStore.viewer.is_leader) {
      leaderStore.reset();
    }
  });

  useEffect(() => {
    tasksStore.reset();
    sessionStore.logout();
  });
  return <Navigate to="/login" replace={true} />;
};

export const Logout = observer(_Logout);
