import { observer } from 'mobx-react-lite';
import { Navigate, useRoutes } from 'react-router-dom';

import { LoginPage } from './login-page';
import { TasksPage, TasksViewer, TasksSubordinates } from './tasks-page';

import { useStore } from 'app';

import { Logout, PrivateRoute } from 'features/auth';

const _Routing = () => {
  const { sessionStore } = useStore();
  const isLeader = sessionStore.viewer.is_leader;
  const elements = useRoutes([
    {
      path: '/',
      element: (
        <PrivateRoute>
          <TasksPage />
        </PrivateRoute>
      ),
      children: [
        {
          path: '',
          element: <TasksViewer />,
        },
        {
          path: '/tasks-subordinates',
          element: isLeader ? <TasksSubordinates /> : <Navigate to={'/'} />,
        },
      ],
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/logout', element: <Logout /> },
    { path: '*', element: <Navigate to={'/login'} /> },
  ]);
  return elements;
};

const Routing = observer(_Routing);
export default Routing;
