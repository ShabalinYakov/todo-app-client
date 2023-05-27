import { withProviders } from './providers';

import Routing from 'pages';

import './App.scss';

const _App = (): JSX.Element => {
  return <Routing />;
};

export const App = withProviders(_App);
