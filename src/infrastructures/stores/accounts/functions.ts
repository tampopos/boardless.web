import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  init: state => {
    if (
      state.claim &&
      !state.claim.isInitialized &&
      Object.values(state.claims).filter(x => x.isInitialized).length === 0
    ) {
      return state;
    }
    const newState = Object.assign({}, state);
    if (newState.claim) {
      newState.claim.isInitialized = false;
    }
    Object.keys(newState.claims).forEach(key => {
      newState.claims[key].isInitialized = false;
    });
    return newState;
  },
  signIn: (s, { result }) => {
    const { claim, workspaces } = result;
    const newState: State = {
      claims: {},
      workspaces: {},
    };
    if (s.claim) {
      const oldUserId = s.claim.userId;
      const oldClaims = Object.entries(s.claims).filter(
        x => x[1].userId !== oldUserId,
      );
      const oldWorkspaces = Object.entries(s.workspaces).filter(
        x => x[1].userId !== oldUserId,
      );
      oldClaims.forEach(x => {
        newState.claims[x[0]] = x[1];
      });
      oldWorkspaces.forEach(x => {
        newState.workspaces[x[0]] = x[1];
      });
    } else {
      newState.claims = { ...s.claims };
      newState.workspaces = { ...s.workspaces };
    }
    if (claim) {
      const newClaim = Object.assign({}, claim, { isInitialized: true });
      newState.claim = newClaim;
      newState.claims[claim.userId] = claim;
      if (workspaces) {
        workspaces.forEach(workspace => {
          newState.workspaces[workspace.userWorkspaceId] = workspace;
        });
      }
    } else if (Object.keys(newState.claims).length > 0) {
      newState.claim = Object.entries(newState.claims)[0][1];
    }
    return newState;
  },
  removeWorkspace: (s, { userWorkspaceId }) => {
    const workspaces = {};
    Object.entries(s.workspaces)
      .filter(x => x[0] !== userWorkspaceId)
      .forEach(x => (workspaces[x[0]] = x[1]));

    return { ...s, workspaces };
  },
  changeWorkspace: (s, { userWorkspaceId }) => {
    const { workspaces, claims } = s;
    const workspace = workspaces[userWorkspaceId];
    const claim = claims[workspace.userId];
    if (s.claim && s.claim.userId === claim.userId) {
      return s;
    }
    return { ...s, claim };
  },
  addWorkspace: (s, { workspace }) => {
    const { workspaces, claims } = s;
    const claim = claims[workspace.userId];
    if (!claim) {
      return s;
    }
    workspaces[workspace.userWorkspaceId] = workspace;
    if (s.claim && s.claim.userId === claim.userId) {
      return { ...s, workspaces };
    }
    return { ...s, workspaces, claim };
  },
};
export default functions;
