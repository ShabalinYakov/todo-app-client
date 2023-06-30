import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  active: boolean;
  children: React.ReactNode;
}

export const Portal = ({ active, children }: Props) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    if (active) {
      document.body.appendChild(container);
      return () => {
        document.body.removeChild(container);
      };
    }
  }, [container, active]);

  return createPortal(children, container);
};
