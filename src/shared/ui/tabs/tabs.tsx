import { observer } from 'mobx-react-lite';
import './tabs.scss';

interface TabsProps {
  children: React.ReactNode;
}

const _Tabs = ({ children }: TabsProps) => {
  return <div className="tabs">{children}</div>;
};

export const Tabs = observer(_Tabs);
