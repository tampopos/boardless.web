import * as React from 'react';
import { Provider } from 'react-redux';
import { StoredState } from 'src/domains/stores/stored-state';
import { createAppStore } from 'src/domains/stores/reducer-factory';
import { resolve } from 'src/domains/services/common/service-provider';

export interface StoreProviderProps {
  initialState: StoredState;
}
export const StoreProvider: React.SFC<StoreProviderProps> = props => {
  const { initialState } = props;
  const store = createAppStore(initialState);
  resolve('dispatchProvider').dispatch = store.dispatch;
  return <Provider store={store}>{props.children}</Provider>;
};
