import * as React from 'react';
import { Provider } from 'react-redux';
import { StoredState } from 'src/stores/stored-state';
import { createAppStore } from 'src/stores/reducer-factory';
import { resolve } from 'src/services/common/service-provider';

export interface StoreProviderProps {
  initialState: StoredState;
}
export const StoreProvider: React.SFC<StoreProviderProps> = props => {
  const store = createAppStore(props);
  resolve('dispatchProvider').dispatch = store.dispatch;
  return <Provider store={store}>{props.children}</Provider>;
};
