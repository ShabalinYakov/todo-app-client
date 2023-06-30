import { observer } from 'mobx-react-lite';
import './main-popup.scss';

interface MainPopupProps {
  children: React.ReactNode;
}

const _MainPopup = ({ children }: MainPopupProps) => {
  return (
    <>
      <div className="main-popup">{children}</div>
    </>
  );
};

export const MainPopup = observer(_MainPopup);
