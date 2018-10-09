import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { Workspace } from 'src/models/accounts/workspace';

export const workspacesReducer = (state: StoredState) =>
  reducerWithInitialState(state.workspacesState)
    .case(workspacesActionCreators.clearInvitedWorkspaces, s => {
      return Object.assign({}, s, { invitedWorkspaces: [] });
    })
    .case(
      workspacesActionCreators.setInvitedWorkspaces,
      (s, { invitedWorkspaces }) => {
        return Object.assign({}, s, { invitedWorkspaces });
      },
    )
    .case(
      workspacesActionCreators.addInvitedWorkspaces,
      (s, { invitedWorkspaces }) => {
        const newWorkspaces = [...s.invitedWorkspaces];
        invitedWorkspaces
          .filter(
            w =>
              s.invitedWorkspaces.filter(
                x => x.id === w.id && x.userId === w.userId,
              ).length === 0,
          )
          .forEach(w => newWorkspaces.push(w));
        return Object.assign({}, s, { invitedWorkspaces: newWorkspaces });
      },
    );
const factory = actionCreatorFactory();
export const workspacesActionCreators = {
  setInvitedWorkspaces: factory<{ invitedWorkspaces: Workspace[] }>(
    'workspacesActionCreators.setInvitedWorkspaces',
  ),
  clearInvitedWorkspaces: factory<void>(
    'workspacesActionCreators.clearInvitedWorkspaces',
  ),
  addInvitedWorkspaces: factory<{ invitedWorkspaces: Workspace[] }>(
    'workspacesActionCreators.addInvitedWorkspaces',
  ),
};
