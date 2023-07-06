import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { useStore } from 'app';

import { BackMyTasks } from 'features/back-my-tasks';
import { CreateTask } from 'features/create-task';
import { ShowTasksSubordinates } from 'features/show-subordinates-tasks';
import { ShowTasks } from 'features/show-tasks';
import { TasksFilters } from 'features/tasks-filters';

import { SubordinatesList } from 'entities/leader';
import { PrivateRoute } from 'entities/session';

import { Button } from 'shared/ui';

import './tasks-page.scss';

const _TasksPage = () => {
  const { sessionStore, filtersStore, tasksStore } = useStore();
  const [selectedId, setSelectedId] = useState<string>('');
  const isLeader = sessionStore.viewer.is_leader;

  useEffect(() => {
    if (tasksStore.tasksViewer.length) {
      filtersStore.setTasks(tasksStore.tasksViewer);
    }
  }, [tasksStore.tasksViewer, filtersStore]);

  return (
    <PrivateRoute>
      <Helmet>
        <title>Страница задач</title>
      </Helmet>
      <div className="container">
        <div className="tasks-page">
          <div className="tasks-page__header">
            <h1>Страница задач</h1>
            <Link to="/logout">
              <Button>Выйти</Button>
            </Link>
          </div>
          <nav className="tasks-page__nav">
            <div className="tasks-page__nav_wrapper">
              <div className="tasks-page__filters">
                <TasksFilters />
              </div>

              {isLeader && (
                <div className="tasks-page__subordinates">
                  {selectedId && <BackMyTasks onResetSelectedId={setSelectedId} />}

                  <ShowTasksSubordinates selectedId={selectedId}>
                    <SubordinatesList selectedId={selectedId} onSelected={setSelectedId} />
                  </ShowTasksSubordinates>
                </div>
              )}
            </div>
            <div className="tasks-page__new-task">
              <CreateTask />
            </div>
          </nav>
          <div className="tasks-page__content">
            <ShowTasks />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export const TasksPage = observer(_TasksPage);
