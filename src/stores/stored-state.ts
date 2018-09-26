import { BarFormState } from './bar/bar-form-state';
import { BarListState } from './bar/bar-list-state';
import { AuthenticateState } from './authenticate/authenticate-state';

export interface StoredState {
  barFormState: BarFormState;
  barListState: BarListState;
  authenticateState: AuthenticateState;
}
