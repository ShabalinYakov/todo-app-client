import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useStore } from 'app';

import { CreateTaskViewer } from 'features/create-task-viewer';
import { CreateTaskLeader } from 'features/leader';

import { Button, Popup } from 'shared/ui';

const _NewTask = () => {
  const { sessionStore } = useStore();
  const isLeader = sessionStore.viewer.is_leader;
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleActive}>Создать задачу</Button>
      <Popup active={active} handleClose={toggleActive}>
        {isLeader ? <CreateTaskLeader onClose={toggleActive} /> : <CreateTaskViewer onClose={toggleActive} />}
      </Popup>
    </>
  );
};

export const NewTask = observer(_NewTask);
