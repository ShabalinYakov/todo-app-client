import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { DEFAULT_FILTER, getFilterById, getFiltersList } from './lib/config';
import { Task, FilterConfig } from './model/types';
import './tasks-filters.scss';

import { useStore } from 'app';

import { Tab, Tabs } from 'shared/ui';

interface Props {
  tasks: Task[];
}

const _TasksFilters = ({ tasks }: Props) => {
  const { filtersStore } = useStore();
  const [active, setActive] = useState(DEFAULT_FILTER);

  const onFilterClick = (config: FilterConfig, activeFilterId: number) => {
    filtersStore.setFilterConfig(config);
    setActive(activeFilterId);
  };

  useEffect(() => {
    filtersStore.reset();
  }, [filtersStore]);

  useEffect(() => {
    filtersStore.setTasks(tasks);
  });

  return (
    <div className="tasks-filters">
      <Tabs>
        {getFiltersList().map(({ id, name }) => (
          <div key={id} onClick={() => onFilterClick(getFilterById(id).config, id)}>
            <Tab active={active === id} value={name} />
          </div>
        ))}
      </Tabs>
    </div>
  );
};

export const TasksFilters = observer(_TasksFilters);
