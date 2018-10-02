import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Friend from '../../models/bar/friend';
import actionCreatorFactory from 'typescript-fsa';

export const barFormReducer = (state: StoredState) =>
  reducerWithInitialState(state.barFormState)
    .case(barFormActionCreators.setFriend, (s, { friend }) => {
      return Object.assign({}, s, { friend });
    })
    .case(barFormActionCreators.setValue, (s, { friend }) => {
      return Object.assign({}, { friend: Object.assign({}, s.friend, friend) });
    });
const factory = actionCreatorFactory();
export const barFormActionCreators = {
  setFriend: factory<{ friend: Friend }>('barFormActionCreators.setFriend'),
  setValue: factory<{ friend: Partial<Friend> }>(
    'barFormActionCreators.setValue',
  ),
};
