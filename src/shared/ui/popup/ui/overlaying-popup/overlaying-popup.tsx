import { observer } from 'mobx-react-lite';
import './overlaying-popup.scss';

interface OverlayPopupProps {
  isOpened: boolean;
  onClose: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

const _OverlayPopup = ({ onClose, isOpened, children }: OverlayPopupProps) => {
  if (!isOpened) {
    return null;
  }
  return (
    <div className="overlay-popup__container" role="dialog">
      <div className="overlay-popup__overlay" role="button" tabIndex={0} onClick={onClose} />
      {children}
    </div>
  );
};

export const OverlayPopup = observer(_OverlayPopup);
