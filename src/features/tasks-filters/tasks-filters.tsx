import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { DEFAULT_FILTER, getFilterById, getFiltersList } from './lib/config';
import './tasks-filters.scss';

import { useStore } from 'app';

const _TasksFilters = () => {
  const { filtersStore } = useStore();
  const [activeFilter, setActiveFilter] = useState<number>();

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(target.value);
    const { config } = getFilterById(id);
    filtersStore.setFilterConfig(config);
    setActiveFilter(id);
  };

  useEffect(() => {
    setActiveFilter(DEFAULT_FILTER);
    filtersStore.setFilterConfig('all');
  }, [filtersStore.tasks, filtersStore]);

  return (
    <div className="tasks-filters">
      <select
        className="tasks-filters__select"
        value={activeFilter}
        name="tasks-filters"
        id="tasks-filters"
        onChange={onChange}
      >
        {getFiltersList().map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const TasksFilters = observer(_TasksFilters);
