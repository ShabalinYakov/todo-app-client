import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { TaskPopup } from './ui/task-popup/task-popup';

import { Task, TaskCard } from 'entities/tasks';

interface Props {
  tasks: Task[];
}

const _TasksList = ({ tasks }: Props) => {
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [activePopup, setActivePopup] = useState(false);

  const toggleActive = () => {
    setActivePopup((prev) => !prev);
  };

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} activatePopup={toggleActive} selectTask={setSelectedTask} />
      ))}
      <TaskPopup active={activePopup} handleClick={toggleActive} task={selectedTask} />
    </>
  );
};

export const TasksList = observer(_TasksList);
