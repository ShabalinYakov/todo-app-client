import { RootStore, RootStoreContext } from 'app';

export const withStore = <T extends Record<string, unknown>>(Component: React.FC<T>) =>
  function WithStore(props: T): JSX.Element {
    return (
      <RootStoreContext.Provider value={new RootStore()}>
        <Component {...props} />
      </RootStoreContext.Provider>
    );
  };
