import { observer } from 'mobx-react-lite';

import './task-card.scss';

import { getPriorityColor, getStatusColorByDeadline } from './helpers';

import { Task } from 'entities/tasks';

interface Props {
  task: Task;
  onSelectTask: (task: Task) => void;
}

interface Datail {
  id: number;
  title: string;
  value: string;
  color?: string;
}

const _TaskCard = ({ task, onSelectTask }: Props) => {
  const { title, priority, deadline, responsible, status } = task;
  const priorityColor = getPriorityColor(priority);
  const details: Datail[] = [
    { id: 1, title: 'Приоритет', value: priority, color: priorityColor },
    { id: 2, title: 'Дата окончания', value: deadline },
    { id: 3, title: 'Ответственный', value: responsible.name },
    { id: 4, title: 'Статус', value: status },
  ];
  const statusColor = getStatusColorByDeadline(status, deadline);

  return (
    <article className={`task-card task-card__shadow_${statusColor}`} onClick={() => onSelectTask(task)}>
      <h2 className={`task-card__title task-card__title_${statusColor}`}>{title}</h2>

      {details.map(({ id, title, value, color }) => (
        <div key={id} className="task-card__detail">
          <span className="task-card__detail__title">{title}:</span>
          <span className={`task-card__detail__value${color ? color : ''}`}>{value}</span>
        </div>
      ))}
    </article>
  );
};

export const TaskCard = observer(_TaskCard);
