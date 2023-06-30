import './task-creator.scss';

import { observer } from 'mobx-react-lite';

interface Props {
  creator: string;
}

const _TaskCreator = ({ creator }: Props) => {
  return (
    <>
      <div>{creator}</div>
    </>
  );
};

export const TaskCreator = observer(_TaskCreator);
