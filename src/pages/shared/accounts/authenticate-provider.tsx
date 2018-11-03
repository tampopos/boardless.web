import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import * as React from 'react';
import { resolve } from 'src/services/common/service-provider';
import { Claim } from 'src/models/accounts/claim';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { init } from 'src/stores/accounts/action-creators';

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
  dispatch(init({}));
  return {
    refreshTokenAsync: async state => {
      await resolve('accountsService').refreshTokenAsync(state);
    },
  };
};
const mapStateToProps: StateMapperWithRouter<Props> = ({ accounts }) => {
  const { claim } = accounts;
  return {
    claim,
  };
};
export const AuthenticateProvider = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
