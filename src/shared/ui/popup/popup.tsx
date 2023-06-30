import { observer } from 'mobx-react-lite';

import { MainPopup } from './ui/main-popup/main-popup';
import { OverlayPopup } from './ui/overlaying-popup/overlaying-popup';
import { Portal } from './ui/portal/portal';

interface Props {
  active: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

const _Popup = ({ active, children, handleClose }: Props) => {
  return (
    <>
      <Portal active={active}>
        <OverlayPopup isOpened={active} onClose={handleClose}>
          <MainPopup>{children}</MainPopup>
        </OverlayPopup>
      </Portal>
    </>
  );
};

export const Popup = observer(_Popup);
