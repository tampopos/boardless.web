import { BarFormState } from './bar/bar-form-state';
import { BarListState } from './bar/bar-list-state';

export interface StoredState {
  barFormState: BarFormState;
  barListState: BarListState;
}
