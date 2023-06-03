import { observer } from 'mobx-react-lite';
import { useRoutes } from 'react-router-dom';

import LoginPage from './login-page';
import { TasksPage } from './tasks-page/tasks-page';

const _Routing = () => {
  const elements = useRoutes([
    { path: '/', element: <TasksPage /> },
    { path: '/login', element: <LoginPage /> },
  ]);
  return elements;
};

const Routing = observer(_Routing);
export default Routing;
