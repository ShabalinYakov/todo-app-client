import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';

const _LeaderLink = () => {
  const { pathname } = useLocation();

  const config =
    pathname === '/'
      ? { path: '/tasks-subordinates', title: 'Задачи подчинённых' }
      : { path: '/tasks', title: 'Мои задачи' };

  return (
    <>
      <Link to={config.path}>{config.title}</Link>
    </>
  );
};

export const LeaderLink = observer(_LeaderLink);
