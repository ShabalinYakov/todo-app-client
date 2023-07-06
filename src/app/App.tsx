import { withProviders } from './providers';

import Routing from 'pages';

import { CheckAuth } from 'entities/session';
import './App.scss';

const _App = () => {
  return (
    <CheckAuth>
      <Routing />
    </CheckAuth>
  );
};

export const App = withProviders(_App);
