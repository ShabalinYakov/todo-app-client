import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { withProviders } from './providers';
import './App.scss';

import { useStore } from 'app';
import Routing from 'pages';

const _App = () => {
  const { sessionStore } = useStore();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!sessionStore.isAuth && pathname !== '/login' && pathname !== '/logout') {
      sessionStore.checkAuth();
    }
  });

  return <Routing />;
};

export const App = withProviders(_App);
