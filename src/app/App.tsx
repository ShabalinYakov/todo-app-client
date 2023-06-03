import { withProviders } from './providers';

import Routing from 'pages';

import './App.scss';

const _App = () => {
  return <Routing />;
};

export const App = withProviders(_App);
