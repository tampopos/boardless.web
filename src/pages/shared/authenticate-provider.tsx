import { DispatchMapper, StateMapper } from 'src/stores/types';
import { authenticateActionCreators } from 'src/stores/authenticate/authenticate-reducer';
import { connect } from 'react-redux';
import * as React from 'react';
import { resolve } from 'src/services/common/service-provider';
import { Claim } from 'src/models/authenticate/claim';

interface Events {
  refreshTokenAsync: (claim?: Claim) => Promise<void>;
}
interface Props {
  claim?: Claim;
}
const Inner: React.SFC<Props & Events> = props => {
  const { claim, refreshTokenAsync, children } = props;
  const notInitialized = claim && !claim.isInitialized;
  if (notInitialized) {
    refreshTokenAsync(claim);
  }
  return <React.Fragment>{!notInitialized && children}</React.Fragment>;
};
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  dispatch(authenticateActionCreators.init({}));
  return {
    refreshTokenAsync: async state => {
      await resolve('authenticateService').refreshTokenAsync(state);
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({ authenticateState }) => {
  const { claim } = authenticateState;
  return {
    claim,
  };
};
export const AuthenticateProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
