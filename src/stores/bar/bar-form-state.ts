import Friend, { createEmptyFriend } from '../../models/bar/friend';

export interface BarFormState {
  friend: Friend;
}
export const defaultBarFormState: BarFormState = {
  friend: createEmptyFriend(),
};
