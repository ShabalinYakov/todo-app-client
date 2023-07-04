import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';

import { useStore } from 'app';

interface Props {
  children: React.ReactNode;
}

const _PrivateRoute = ({ children }: Props) => {
  const { sessionStore } = useStore();
  const location = useLocation();

  if (sessionStore.isAuthLoading) return <h1>Загрузка...</h1>;

  if (sessionStore.isAuth) return <>{children}</>;

  return <Navigate to="/login" state={{ from: location }} />;
};

export const PrivateRoute = observer(_PrivateRoute);
