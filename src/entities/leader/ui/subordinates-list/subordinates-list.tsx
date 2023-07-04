import { observer } from 'mobx-react-lite';

import { useStore } from 'app';
import './subordinates-list.scss';

interface Props {
  selectedId: string;
  onSelected: (id: string) => void;
}

const _SubordinatesList = ({ selectedId, onSelected }: Props) => {
  const { leaderStore } = useStore();
  return (
    <>
      <select
        className="subordinates-list__select"
        value={selectedId}
        name="subordinates-list"
        id="subordinates-list"
        onChange={({ target }) => {
          onSelected(target.value);
        }}
      >
        <option disabled value="">
          Список подчинённых
        </option>
        {leaderStore.subordinates.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
};

export const SubordinatesList = observer(_SubordinatesList);
