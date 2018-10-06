import { StyledSFC } from 'src/common/styles/types';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { StateMapper } from 'src/stores/types';
import { RouteComponentProps, Route } from 'react-router';
import { decorate } from 'src/common/styles/styles-helper';
import { withRouter } from 'src/common/routing/routing-helper';
import { Url } from 'src/common/routing/url';
import { WorkSpace } from 'src/models/accounts/work-space';
import { Claim } from 'src/models/accounts/claim';
import { SideMenuContainer } from '../side-menu-container';
import { Bar } from 'src/pages/bar';

const styles = createStyles({
  root: {},
});
interface Props {
  workSpaces: { [index: string]: WorkSpace };
  claims: { [index: string]: Claim };
}
const Inner: StyledSFC<
  typeof styles,
  Props & RouteComponentProps<{ workSpaceId: string }>
> = props => {
  const { history, match, workSpaces, claims } = props;
  const { workSpaceId } = match.params;
  const checkWorkSpace = () => {
    if (!workSpaceId) {
      return;
    }
    const workSpace = workSpaces[workSpaceId];
    if (!workSpace) {
      history.push(Url.root);
      return;
    }
    const claim = claims[workSpace.userId];
    if (!claim) {
      history.push(Url.root);
      return;
    }
  };
  checkWorkSpace();
  return (
    <SideMenuContainer>
      <Route exact={true} path={Url.workSpaceRootTemplate} component={Bar} />
      <Route exact={true} path={Url.root} component={Bar} />
    </SideMenuContainer>
  );
};
const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { workSpaces, claims } = accountsState;
  return {
    workSpaces,
    claims,
  };
};
const StyledInner = decorate(styles)(Inner);
const RoutingInner = withRouter(StyledInner);
export const AuthenticatedRoot = connect(mapStateToProps)(RoutingInner);
