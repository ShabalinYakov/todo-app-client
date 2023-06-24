import { observer } from 'mobx-react-lite';
import { Link, Outlet } from 'react-router-dom';

import { useStore } from 'app';

import { LeaderLink } from 'features/leader';

import { Button } from 'shared/ui';
import './tasks-page.scss';

const _TasksPage = () => {
  const { sessionStore } = useStore();

  return (
    <>
      <div className="tasks-page__header">
        <h1>Страница задач</h1>
        <Link to="/logout">
          <Button>Выйти</Button>
        </Link>
      </div>
      {sessionStore.viewer.is_leader && <LeaderLink />}
      <div className="tasks-page__tasks-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export const TasksPage = observer(_TasksPage);
