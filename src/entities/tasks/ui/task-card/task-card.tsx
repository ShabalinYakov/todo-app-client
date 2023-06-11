import { observer } from 'mobx-react-lite';

import { Task } from 'entities/tasks';
import './task-card.scss';

interface TaskCardProps {
  task: Task;
}
const titleColor = (status: string, deadline: string) => {
  if (status === 'выполнена') {
    return 'green';
  } else if (Date.now() > Date.parse(deadline)) {
    return 'red';
  } else {
    return 'gray';
  }
};

const color = (priority: string) => {
  switch (priority) {
    case 'высокий':
      return '_high';
    case 'средний':
      return '_medium';
    case 'низкий':
      return '_low';
  }
};

const _TaskCard = ({ task }: TaskCardProps) => {
  const { title, priority, deadline, responsible, status } = task;

  return (
    <div className={`task-card task-card__shadow_${titleColor(status, deadline)}`}>
      <header className="task-card__header">
        <h4 className={`title_${titleColor(status, deadline)}`}>{title}</h4>
        <div>
          <div className={`priority priority__border${color(priority)}`}>
            <span className={`priority__value priority__value${color(priority)}`}>{priority}</span>
            <p className="priority__label">приоритет</p>
          </div>
        </div>
      </header>
      <div className="item">
        <div className="item__label">Дата окончания</div>
        <div className="item__value">{deadline}</div>
      </div>

      <div className="item">
        <div className="item__label">Ответственный</div>
        <div className="item__value">{responsible}</div>
      </div>

      <div className="item">
        <div className="item__label">Статус</div>
        <div className="item__value">{status}</div>
      </div>
    </div>
  );
};

export const TaskCard = observer(_TaskCard);