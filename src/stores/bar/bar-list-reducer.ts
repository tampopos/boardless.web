import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Friend from '../../models/bar/friend';
import actionCreatorFactory from 'typescript-fsa';

export const barListReducer = (state: StoredState) =>
  reducerWithInitialState(state.barListState)
    .case(barListActionCreators.add, (s, { friend }) => {
      s.friends.push(friend);
      return Object.assign({}, s);
    })
    .case(barListActionCreators.remove, (s, { id }) => {
      return Object.assign(
        {},
        { friends: s.friends.filter(friend => friend.id !== id) },
      );
    });
const factory = actionCreatorFactory();
export const barListActionCreators = {
  add: factory<{ friend: Friend }>('barListActionCreators.add'),
  remove: factory<{ id: number }>('barListActionCreators.remove'),
};
