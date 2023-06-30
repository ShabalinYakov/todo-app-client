import { observer } from 'mobx-react-lite';
import { Link, Outlet } from 'react-router-dom';

import { useStore } from 'app';

import { NewTask } from 'widgets/new-task';

import { LeaderLink } from 'features/leader';

import { Button } from 'shared/ui';

import './tasks-page.scss';

const _TasksPage = () => {
  const { sessionStore } = useStore();
  const isLeader = sessionStore.viewer.is_leader;

  return (
    <>
      <div className="tasks-page__header">
        <h1>Страница задач</h1>
        <Link to="/logout">
          <Button>Выйти</Button>
        </Link>
      </div>

      <nav className="tasks-page__nav">
        <NewTask />
        {isLeader && <LeaderLink />}
      </nav>
      <div className="tasks-page__tasks-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export const TasksPage = observer(_TasksPage);
