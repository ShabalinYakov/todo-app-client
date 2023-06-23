import { observer } from 'mobx-react-lite';
import './tab.scss';

interface TabProps {
  value: string;
  active: boolean;
}

const _Tab = ({ value, active }: TabProps) => {
  const activeClass = active ? ' tab_active' : '';
  return (
    <>
      <button className={`tab${activeClass}`}>{value}</button>
    </>
  );
};

export const Tab = observer(_Tab);
