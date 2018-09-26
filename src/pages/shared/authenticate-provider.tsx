import { AuthenticateState } from 'src/stores/authenticate/authenticate-state';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { authenticateActionCreators } from 'src/stores/authenticate/authenticate-reducer';
import { AuthenticateService } from 'src/services/authenticate-service';
import { connect } from 'react-redux';
import * as React from 'react';

interface Events {
  refreshTokenAsync: (state: AuthenticateState) => Promise<void>;
}
interface Props {
  authenticateState: AuthenticateState;
}
const Inner: React.SFC<Props & Events> = props => {
  const { authenticateState, refreshTokenAsync, children } = props;
  if (!authenticateState.isInitialized) {
    refreshTokenAsync(authenticateState);
  }
  return (
    <React.Fragment>
      {authenticateState.isInitialized && children}
    </React.Fragment>
  );
};
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  dispatch(authenticateActionCreators.init({}));
  return {
    refreshTokenAsync: async state => {
      const newState = await AuthenticateService.refreshTokenAsync(state);
      dispatch(authenticateActionCreators.set({ state: newState }));
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({ authenticateState }) => {
  return {
    authenticateState,
  };
};
export const AuthenticateProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
