import { observer } from 'mobx-react-lite';
import './item-group.scss';

interface ItemGroupProps {
  value: string;
  selected: boolean;
}

const _ItemGroup = ({ value, selected }: ItemGroupProps) => {
  const cl = selected ? ' item-group_selected' : '';
  return (
    <>
      <div className={`item-group${cl}`}>{value}</div>
    </>
  );
};

export const ItemGroup = observer(_ItemGroup);
