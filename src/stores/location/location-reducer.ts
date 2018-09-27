import { StoredState } from '../stored-state';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actionCreatorFactory from 'typescript-fsa';

import { ActionCreators } from '../types';
import { Culture } from 'src/common/location/localize-provider';

export const locationReducer = (state: StoredState) =>
  reducerWithInitialState(state.locationState).case(
    locationActionCreators.setCulture,
    (s, p) => {
      return Object.assign({}, s, { cultureName: p.cultureName });
    },
  );
interface Event {
  setCulture: { cultureName: Culture };
}
const factory = actionCreatorFactory();
export const locationActionCreators: ActionCreators<Event> = {
  setCulture: factory<{ cultureName: Culture }>(
    'locationActionCreators.setCulture',
  ),
};
