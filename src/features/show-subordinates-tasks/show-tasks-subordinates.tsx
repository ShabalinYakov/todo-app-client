import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from 'app';

import { SubordinatesLoader } from 'entities/leader';

interface Props {
  selectedId: string;

  children: React.ReactNode;
}

const _ShowTasksSubordinates = ({ selectedId, children }: Props) => {
  const { tasksStore, filtersStore, sessionStore } = useStore();

  useEffect(() => {
    if (selectedId) {
      tasksStore.loadTasksSubordinateById(selectedId);
    }
  }, [selectedId, tasksStore]);

  useEffect(() => {
    if (tasksStore.tasksSubordinate.length !== 0) {
      filtersStore.setTasks(tasksStore.tasksSubordinate);
    }
  }, [tasksStore.tasksSubordinate, filtersStore]);

  return <SubordinatesLoader isLeader={sessionStore.viewer.is_leader}>{children}</SubordinatesLoader>;
};

export const ShowTasksSubordinates = observer(_ShowTasksSubordinates);
