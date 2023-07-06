import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useStore } from 'app';

interface Props {
  children: React.ReactNode;
}

const _CheckAuth = ({ children }: Props) => {
  const { sessionStore } = useStore();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sessionStore.isAuth && pathname !== '/logout') {
      sessionStore.checkAuth();
    }
  });
  return <>{children}</>;
};

export const CheckAuth = observer(_CheckAuth);
