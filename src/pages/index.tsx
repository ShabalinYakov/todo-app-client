import { observer } from 'mobx-react-lite';
import { Navigate, useRoutes } from 'react-router-dom';

import { LoginPage } from './login-page';
import { TasksPage } from './tasks-page';

import { Logout } from 'features/logout';

const _Routing = () => {
  const elements = useRoutes([
    { path: '/', element: <TasksPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/logout', element: <Logout /> },
    { path: '*', element: <Navigate to={'/login'} /> },
  ]);
  return elements;
};

const Routing = observer(_Routing);
export default Routing;
