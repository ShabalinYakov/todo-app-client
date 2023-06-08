import { useEffect } from 'react';

import { withProviders } from './providers';
import './App.scss';

import { useStore } from 'app';
import Routing from 'pages';

const _App = () => {
  const { sessionStore } = useStore();

  useEffect(() => {
    sessionStore.checkAuth();
  });

  return <Routing />;
};

export const App = withProviders(_App);
