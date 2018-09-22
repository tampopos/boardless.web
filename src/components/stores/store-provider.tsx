import * as React from 'react';
import { Provider } from 'react-redux';
import { StoredState } from 'src/stores/stored-state';
import { createAppStore } from 'src/stores/reducer-factory';

export interface StoreProviderProps {
  initialState: StoredState;
}
export const StoreProvider: React.SFC<StoreProviderProps> = props => {
  const store = createAppStore(props);
  return <Provider store={store}>{props.children}</Provider>;
};
