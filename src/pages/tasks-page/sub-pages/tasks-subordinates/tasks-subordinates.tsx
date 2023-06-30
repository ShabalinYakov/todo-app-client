import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import './tasks-subordinates.scss';

import { useStore } from 'app';

import { SubordinatesList } from 'features/leader';
import { TasksFilters } from 'features/tasks-filters';
import { TasksList } from 'features/tasks-list';

const _TasksSubordinates = () => {
  const { leaderStore, filtersStore } = useStore();

  useEffect(() => {
    if (leaderStore.subordinates.length === 0) {
      leaderStore.loadSubordinates();
    }
  }, [leaderStore]);

  if (leaderStore.subordinates.length === 0) {
    return <h3>Загрузка...</h3>;
  }
  return (
    <>
      <SubordinatesList />
      <TasksFilters tasks={leaderStore.tasksSubordinate} />
      <div className="tasks-subordinates">
        <TasksList tasks={filtersStore.filteredTasks} />
      </div>
    </>
  );
};

export const TasksSubordinates = observer(_TasksSubordinates);
