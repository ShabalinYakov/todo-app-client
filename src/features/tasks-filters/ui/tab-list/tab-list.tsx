import { observer } from 'mobx-react-lite';

import { Filter } from '../../lib/config';

import { Tab, Tabs } from 'shared/ui';

interface TabsListProps {
  active: number;
  filters: Filter[];
  onActive: (active: number) => void;
}

const _TabsList = ({ active, filters, onActive }: TabsListProps) => {
  return (
    <>
      <Tabs>
        {filters.map((filter) => (
          <div key={filter.id} onClick={() => onActive(filter.id)}>
            <Tab active={active === filter.id} value={filter.name} />
          </div>
        ))}
      </Tabs>
    </>
  );
};

export const TabsList = observer(_TabsList);
