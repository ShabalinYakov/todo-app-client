import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { PrivateRoute } from 'features/private-route';

const _TasksPage = () => {
  return (
    <PrivateRoute>
      <h1>Страница задач</h1>
      <Link to="/logout">Logout</Link>
    </PrivateRoute>
  );
};

export const TasksPage = observer(_TasksPage);
