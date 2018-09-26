import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Friend from '../../models/friend';
import actionCreatorFactory from 'typescript-fsa';
import { ActionCreators } from '../types';

export const barFormReducer = (state: StoredState) =>
  reducerWithInitialState(state.barFormState)
    .case(barFormActionCreators.setFriend, (s, { friend }) => {
      return Object.assign({}, s, { friend });
    })
    .case(barFormActionCreators.setValue, (s, { friend }) => {
      return Object.assign({}, { friend: Object.assign({}, s.friend, friend) });
    });
interface Event {
  setFriend: { friend: Friend };
  setValue: { friend: Partial<Friend> };
}
const factory = actionCreatorFactory();
export const barFormActionCreators: ActionCreators<Event> = {
  setFriend: factory<{ friend: Friend }>('barFormActionCreators.setFriend'),
  setValue: factory<{ friend: Partial<Friend> }>(
    'barFormActionCreators.setValue',
  ),
};
