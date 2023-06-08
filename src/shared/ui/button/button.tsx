import { ButtonHTMLAttributes, ClassAttributes } from 'react';
import './button.scss';

interface Prop {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const Button = ({
  onClick,
  children,
  ...props
}: Prop & ButtonHTMLAttributes<HTMLButtonElement> & ClassAttributes<HTMLButtonElement>) => {
  return (
    <button className="button" onClick={onClick} {...props}>
      {children}
    </button>
  );
};
