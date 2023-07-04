import { observer } from 'mobx-react-lite';
import './main-popup.scss';

interface MainPopupProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const _MainPopup = ({ onClose, children }: MainPopupProps) => {
  return (
    <>
      <div className="main-popup">
        <button className="main-popup__close-button" onClick={onClose}></button>
        {children}
      </div>
    </>
  );
};

export const MainPopup = observer(_MainPopup);
