import * as React from 'react';
import { Claim } from 'src/domains/models/accounts/claim';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { resolve } from 'src/domains/services/common/service-provider';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { init } from 'src/infrastructures/stores/accounts/action-creators';
import { DispatchMapper } from 'src/infrastructures/stores/types';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';

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
const mapStateToProps: StateMapperWithRouter<StoredState, Props> = ({
  accounts,
}) => {
  const { claim } = accounts;
  return {
    claim,
  };
};
export const AuthenticateProvider = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
