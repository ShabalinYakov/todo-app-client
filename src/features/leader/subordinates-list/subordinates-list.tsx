import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { useStore } from 'app';

import { Tab, Tabs } from 'shared/ui';
import './subordinates-list.scss';

const _SubordinatesList = () => {
  const { leaderStore } = useStore();
  const [active, setActive] = useState(leaderStore.subordinates[0].id);

  useEffect(() => {
    if (active) {
      leaderStore.loadTasksSubordinateById(active);
    }
  }, [leaderStore, active]);

  return (
    <>
      <div className="group-subordinates">
        <Tabs>
          {leaderStore.subordinates.map(({ id, name }) => (
            <div key={id} onClick={() => setActive(id)}>
              <Tab active={active === id} value={name} />
            </div>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export const SubordinatesList = observer(_SubordinatesList);
