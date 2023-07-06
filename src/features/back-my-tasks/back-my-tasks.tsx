import { observer } from 'mobx-react-lite';

import { useStore } from 'app';

import './back-my-tasks.scss';

interface Props {
  onResetSelectedId: (value: string) => void;
}

const _BackMyTasks = ({ onResetSelectedId }: Props) => {
  const { tasksStore, filtersStore } = useStore();

  const handeClick = () => {
    filtersStore.setTasks(tasksStore.tasksViewer);
    onResetSelectedId('');
  };
  return (
    <>
      <button className="back-my-tasks" onClick={handeClick}>
        Вернуться к моим задачам
      </button>
    </>
  );
};

export const BackMyTasks = observer(_BackMyTasks);
