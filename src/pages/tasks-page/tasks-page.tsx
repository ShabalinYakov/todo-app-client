import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useStore } from 'app';

import { TasksList } from 'features/tasks-list';
import './tasks-page.scss';

const _TasksPage = () => {
  const { tasksStore } = useStore();

  useEffect(() => {
    if (tasksStore.tasks.length === 0) {
      tasksStore.loadTasks();
    }
  }, [tasksStore]);

  return (
    <>
      <h1>Страница задач</h1>
      <Link to="/logout">Logout</Link>
      <div className="tasks-page__tasks-wrapper">
        <TasksList tasks={tasksStore.tasks} isLoad={tasksStore.isLoading} />
      </div>
    </>
  );
};

export const TasksPage = observer(_TasksPage);
