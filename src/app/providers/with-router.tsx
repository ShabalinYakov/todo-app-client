import { BrowserRouter } from 'react-router-dom';

export const withRouter = <T extends Record<string, unknown>>(Component: React.FC<T>) =>
  function WithRouter(props: T): JSX.Element {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    );
  };
