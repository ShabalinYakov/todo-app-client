import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';

import { useStore } from 'app';

interface Props {
  children: React.ReactNode;
}

const _AuthRedirect = ({ children }: Props) => {
  const { sessionStore } = useStore();
  const location = useLocation();
  const redirect = location.state !== null ? location.state.from.pathname : '/';

  if (sessionStore.isAuth) {
    return <Navigate to={redirect} replace={true} />;
  }

  if (sessionStore.isAuthLoading) return <h1>Загрузка...</h1>;

  return <>{children}</>;
};

export const AuthRedirect = observer(_AuthRedirect);
