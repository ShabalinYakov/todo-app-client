import { observer } from 'mobx-react-lite';

import { Task, TaskCard } from 'entities/tasks';
import './task-list.scss';

interface Props {
  tasks: Task[];
  setTask: (task: Task) => void;
  handleClick: () => void;
}

const _TasksList = ({ tasks, setTask, handleClick }: Props) => {
  return (
    <>
      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className="tasks-list__task" onClick={handleClick}>
            <TaskCard task={task} onSelectTask={setTask} />
          </div>
        ))}
      </div>
    </>
  );
};

export const TasksList = observer(_TasksList);
