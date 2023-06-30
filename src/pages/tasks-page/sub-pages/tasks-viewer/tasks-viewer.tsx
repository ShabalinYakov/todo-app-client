import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from 'app';

import { TasksFilters } from 'features/tasks-filters';
import { TasksList } from 'features/tasks-list';

import './tasks-viewer.scss';

const _TasksViewer = () => {
  const { tasksStore, filtersStore } = useStore();

  useEffect(() => {
    if (tasksStore.tasksViewer.length === 0) {
      tasksStore.loadViewerTasks();
    }
  }, [tasksStore]);

  if (tasksStore.isLoading) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <>
      <TasksFilters tasks={tasksStore.tasksViewer} />
      <div className="tasks-list">
        <TasksList tasks={filtersStore.filteredTasks} />
      </div>
    </>
  );
};

export const TasksViewer = observer(_TasksViewer);
