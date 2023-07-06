import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { CreateTaskForm } from './create-task-form/create-task-form';

import { Button, Popup } from 'shared/ui';

const _CreateTask = () => {
  const [activeNewTask, setActiveNewTask] = useState(false);

  const toggleNewTask = () => {
    setActiveNewTask((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleNewTask}>Создать задачу</Button>
      <Popup active={activeNewTask} handleClose={toggleNewTask}>
        <CreateTaskForm onClose={toggleNewTask} />
      </Popup>
    </>
  );
};

export const CreateTask = observer(_CreateTask);
