import { observer } from 'mobx-react-lite';
import { useRoutes } from 'react-router-dom';

import { LoginPage } from './login-page';
import { TasksPage } from './tasks-page/tasks-page';

import { Logout } from 'features/logout';
import { PrivateRoute } from 'features/private-route';

const _Routing = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: (
        <PrivateRoute>
          <TasksPage />
        </PrivateRoute>
      ),
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/logout', element: <Logout /> },
  ]);
  return elements;
};

const Routing = observer(_Routing);
export default Routing;
