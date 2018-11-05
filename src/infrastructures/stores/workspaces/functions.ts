import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  clearInvitedWorkspaces: s => {
    return Object.assign({}, s, { invitedWorkspaces: {} });
  },
  setInvitedWorkspaces: (s, { invitedWorkspaces }) => {
    return Object.assign({}, s, { invitedWorkspaces });
  },
  addInvitedWorkspaces: (s, { invitedWorkspaces }) => {
    invitedWorkspaces.forEach(
      w => (s.invitedWorkspaces[w.userWorkspaceId] = w),
    );
    return Object.assign({}, s, {
      invitedWorkspaces: { ...s.invitedWorkspaces },
    });
  },
  clearJoinableWorkspaces: s => {
    return Object.assign({}, s, { joinableWorkspaces: {} });
  },
  addJoinableWorkspaces: (s, { joinableWorkspaces }) => {
    joinableWorkspaces.forEach(w => (s.joinableWorkspaces[w.id] = w));
    return Object.assign({}, s, {
      joinableWorkspaces: { ...s.joinableWorkspaces },
    });
  },
};
export default functions;
