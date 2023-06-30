import { observer } from 'mobx-react-lite';
import './button-group.scss';

interface ButtonGroupProps {
  children: React.ReactNode;
}

const _ButtonGroup = ({ children }: ButtonGroupProps) => {
  return <div className="button-group">{children}</div>;
};

export const ButtonGroup = observer(_ButtonGroup);
