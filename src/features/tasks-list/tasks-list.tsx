import { observer } from 'mobx-react-lite';

import { Task, TaskCard } from 'entities/tasks';

interface Props {
  tasks: Task[];
  isLoad: boolean;
}

const _TasksList = ({ tasks, isLoad }: Props) => {
  if (isLoad) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

export const TasksList = observer(_TasksList);
