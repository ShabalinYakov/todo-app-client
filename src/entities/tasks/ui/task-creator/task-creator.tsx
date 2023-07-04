import './task-creator.scss';

import { observer } from 'mobx-react-lite';

interface Props {
  creator: string;
}

const _TaskCreator = ({ creator }: Props) => {
  return (
    <>
      <div className="form-creator__field">
        <h3>Создатель: {creator}</h3>
      </div>
    </>
  );
};

export const TaskCreator = observer(_TaskCreator);
