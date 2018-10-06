import Friend from '../../models/bar/friend';

export interface BarListState {
  friends: Friend[];
}
export const defaultBarListState: BarListState = {
  friends: [],
};
