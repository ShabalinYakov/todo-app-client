import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { TaskPopup } from './task-popup';

import { useStore } from 'app';

import { Task, TasksList, TasksLoader } from 'entities/tasks';

const _ShowTasks = () => {
  const { filtersStore } = useStore();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [activePopup, setActivePopup] = useState(false);

  const togglePopup = () => {
    setActivePopup((prev) => !prev);
  };
  return (
    <>
      <TasksLoader>
        <TasksList tasks={filtersStore.filteredTasks} setTask={setSelectedTask} handleClick={togglePopup} />
      </TasksLoader>
      <TaskPopup active={activePopup} handleClick={togglePopup} task={selectedTask} />
    </>
  );
};

export const ShowTasks = observer(_ShowTasks);
