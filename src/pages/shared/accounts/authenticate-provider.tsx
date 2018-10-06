import { DispatchMapper, StateMapper } from 'src/stores/types';
import { accountsActionCreators } from 'src/stores/accounts/accounts-reducer';
import { connect } from 'react-redux';
import * as React from 'react';
import { resolve } from 'src/services/common/service-provider';
import { Claim } from 'src/models/accounts/claim';

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
  dispatch(accountsActionCreators.init({}));
  return {
    refreshTokenAsync: async state => {
      await resolve('accountsService').refreshTokenAsync(state);
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { claim } = accountsState;
  return {
    claim,
  };
};
export const AuthenticateProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
