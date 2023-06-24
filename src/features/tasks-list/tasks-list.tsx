import { observer } from 'mobx-react-lite';

import { Task, TaskCard } from 'entities/tasks';

interface Props {
  tasks: Task[];
}

const _TasksList = ({ tasks }: Props) => {
  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

export const TasksList = observer(_TasksList);
