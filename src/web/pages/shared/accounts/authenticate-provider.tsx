import * as React from 'react';
import { Claim } from 'src/domains/models/accounts/claim';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { init } from 'src/infrastructures/stores/accounts/action-creators';
import { EventMapper } from 'src/infrastructures/stores/types';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';

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
const mapEventToProps: EventMapper<Events> = dispatch => {
  const { refreshTokenAsync } = resolve(symbols.accountsUseCase);
  dispatch(init({}));
  return {
    refreshTokenAsync: async state => await refreshTokenAsync(state),
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
  mapEventToProps,
)(Inner);
