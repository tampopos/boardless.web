import * as React from 'react';
import { Provider } from 'react-redux';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { createAppStore } from 'src/infrastructures/stores/reducer-factory';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';

export interface StoreProviderProps {
  initialState: StoredState;
}
export const StoreProvider: React.SFC<StoreProviderProps> = props => {
  const { initialState } = props;
  const store = createAppStore(initialState);
  resolve(symbols.dispatchProvider).dispatch = store.dispatch;
  return <Provider store={store}>{props.children}</Provider>;
};
