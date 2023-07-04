import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from 'app';

interface Props {
  children: React.ReactNode;
}

const _TasksLoader = ({ children }: Props) => {
  const { tasksStore } = useStore();

  useEffect(() => {
    tasksStore.loadViewerTasks();
  }, [tasksStore]);

  if (tasksStore.isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return <>{children}</>;
};

export const TasksLoader = observer(_TasksLoader);
