import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

export const actionCreators = createActionCreators('workspaces')<Action>(
  'setInvitedWorkspaces',
  'clearInvitedWorkspaces',
  'addInvitedWorkspaces',
  'clearJoinableWorkspaces',
  'addJoinableWorkspaces',
);
export const {
  setInvitedWorkspaces,
  clearInvitedWorkspaces,
  addInvitedWorkspaces,
  clearJoinableWorkspaces,
  addJoinableWorkspaces,
} = actionCreators;
export default actionCreators;
