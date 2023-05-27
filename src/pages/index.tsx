import { observer } from 'mobx-react-lite';
import { useRoutes } from 'react-router-dom';

const _Routing = (): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null => {
  const elements = useRoutes([
    {
      path: '/',
      element: <h1>Initial</h1>,
    },
  ]);
  return elements;
};

const Routing = observer(_Routing);
export default Routing;
