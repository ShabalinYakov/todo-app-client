import { observer } from 'mobx-react-lite';

import { TaskCreator } from '../task-creator/task-creator';
import { TaskDeadline } from '../task-deadline/task-deadline';
import { TaskDescription } from '../task-description/task-description';
import { PrioritiesLoader } from '../task-priority/priorities-loader';
import { TaskPriority } from '../task-priority/task-priority';
import { ResponsiblesLoader } from '../task-responsible/responsibles-loader';
import { TaskResponsible } from '../task-responsible/task-responsible';
import { StatusesLoader } from '../task-status/statuses-loader';
import { TaskStatus } from '../task-status/task-status';
import { TaskTitle } from '../task-title/task-title';

import { Task } from 'entities/tasks';

import { Popup } from 'shared/ui';
import './task-popup.scss';

interface Props {
  task?: Task;
  active: boolean;
  handleClick: () => void;
}

const _TaskPopup = ({ task, active, handleClick }: Props) => {
  if (!task) return;

  return (
    <Popup active={active} handleClose={handleClick}>
      <h1>Редактировать</h1>

      <TaskTitle title={task.title} taskId={task.id} />

      <TaskDescription description={task.description} taskId={task.id} />

      <TaskDeadline deadline={task.deadline} taskId={task.id} />

      <PrioritiesLoader>
        <TaskPriority priority={task.priority} taskId={task.id} />
      </PrioritiesLoader>

      <div>Ответственный</div>
      <TaskCreator creator={task.creator.name} />

      <ResponsiblesLoader>
        <TaskResponsible responsible={task.responsible} taskId={task.id} />
      </ResponsiblesLoader>

      <StatusesLoader>
        <TaskStatus status={task.status} taskId={task.id} />
      </StatusesLoader>
    </Popup>
  );
};

export const TaskPopup = observer(_TaskPopup);
