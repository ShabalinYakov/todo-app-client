import { observer } from 'mobx-react-lite';

import { useStore } from 'app';

import { PrioritiesLoader } from 'entities/priorities';
import { StatusesLoader } from 'entities/statuses';
import {
  EditTaskDeadline,
  EditTaskStatus,
  EditTaskResponsible,
  EditTaskTitle,
  EditTaskDescription,
  EditTaskPriority,
  Task,
  TaskCreator,
} from 'entities/tasks';

import { Popup } from 'shared/ui';
import './task-popup.scss';

interface Props {
  task?: Task;
  active: boolean;
  handleClick: () => void;
}

const _TaskPopup = ({ task, active, handleClick }: Props) => {
  const { sessionStore, prioritiesStore, leaderStore, statusesStore } = useStore();
  const { id: viewerId, is_leader } = sessionStore.viewer;
  const isCreator = task?.creator.id === viewerId;

  if (!task) return;

  return (
    <Popup active={active} handleClose={handleClick}>
      <h1>Редактировать</h1>

      <EditTaskTitle isCreator={isCreator} title={task.title} taskId={task.id} />

      <EditTaskDescription isCreator={isCreator} description={task.description} taskId={task.id} />

      <EditTaskDeadline isCreator={isCreator} deadline={task.deadline} taskId={task.id} />

      <PrioritiesLoader>
        <EditTaskPriority
          priorirtiesArr={prioritiesStore.priorities}
          isCreator={isCreator}
          priority={task.priority}
          taskId={task.id}
        />
      </PrioritiesLoader>

      <TaskCreator creator={task.creator.name} />

      {is_leader && (
        <EditTaskResponsible
          viewerId={viewerId}
          subordinates={leaderStore.subordinates}
          responsible={task.responsible}
          taskId={task.id}
        />
      )}

      <StatusesLoader>
        <EditTaskStatus statusesArr={statusesStore.statuses} status={task.status} taskId={task.id} />
      </StatusesLoader>
    </Popup>
  );
};

export const TaskPopup = observer(_TaskPopup);
