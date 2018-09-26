import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import Friend from '../../models/friend';
import actionCreatorFactory from 'typescript-fsa';
import { ActionCreators } from '../types';

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
interface Event {
  add: { friend: Friend };
  remove: { id: number };
}
const factory = actionCreatorFactory();
export const barListActionCreators: ActionCreators<Event> = {
  add: factory<{ friend: Friend }>('barListActionCreators.add'),
  remove: factory<{ id: number }>('barListActionCreators.remove'),
};
