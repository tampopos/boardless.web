import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { DispatchMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { UserWorkspace } from 'src/domains/models/accounts/workspace';
import { Claim } from 'src/domains/models/accounts/claim';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { OutlinedButton } from 'src/web/components/forms-controls/button';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { resolve } from 'src/use-cases/common/di-container';
import { Cell } from 'src/web/components/layout/cell';
import { WorkspaceIcon } from './workspace-icon';
import { Url } from 'src/infrastructures/routing/url';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { symbols } from 'src/use-cases/common/di-symbols';

const styles = createStyles({
  root: { padding: 10 },
  actionButtonRow: { justifyContent: 'center', marginTop: 50 },
  btn: { width: 200, marginRight: 20, marginLeft: 20 },
  listRow: { marginTop: 30, paddingLeft: 30, paddingRight: 30 },
});
interface Props {
  resources: Resources;
  workspaces: { [index: string]: UserWorkspace };
  claims: { [index: string]: Claim };
  history: History;
  invitedWorkspaces: { [index: string]: UserWorkspace };
}
interface Params {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<StoredState, Props, Params> = (
  { accounts, workspaces },
  { history },
) => {
  const { claims } = accounts;
  const { invitedWorkspaces } = workspaces;
  const { resources } = new AccountsSelectors(accounts);
  return {
    workspaces: accounts.workspaces,
    claims,
    resources,
    history,
    invitedWorkspaces,
  };
};
interface Events {
  getInvitedWorkspaces: (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: UserWorkspace },
  ) => void;
  add: (workspace: UserWorkspace, history: History) => void;
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  const { getInvitedWorkspaces, add } = resolve(symbols.workspaceUseCase);
  return {
    getInvitedWorkspaces,
    add: (workspace, history) => {
      add(workspace);
      history.push(Url.workspaceRoot(workspace.workspaceUrl));
    },
  };
};
interface State {}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public async componentDidMount() {
    const { getInvitedWorkspaces, claims, workspaces } = this.props;
    getInvitedWorkspaces(claims, workspaces);
  }
  public render() {
    const {
      classes,
      resources,
      invitedWorkspaces,
      claims,
      add,
      history,
    } = this.props;
    const { root, actionButtonRow, btn, listRow } = classes;
    return (
      <Container className={root}>
        <Row>
          <Typography variant="h4">{resources.AddingWorkspace}</Typography>
        </Row>
        <Row className={actionButtonRow}>
          <OutlinedButton color="primary" className={btn}>
            {resources.AddNewWorkspace}
          </OutlinedButton>
          <OutlinedButton
            color="secondary"
            className={btn}
            onClick={() => history.push(Url.searchWorkspaces())}
          >
            {resources.JoinWorkspace}
          </OutlinedButton>
        </Row>
        {Object.entries(invitedWorkspaces).length > 0 && (
          <Row className={listRow}>
            <Row>
              <Typography variant="h6">{resources.InvitedWorkspace}</Typography>
            </Row>
            <Row>
              {Object.entries(invitedWorkspaces).map(x => {
                const w = x[1];
                const { userWorkspaceId, userId, name } = w;
                const claim = claims[userId];
                return (
                  <Row key={userWorkspaceId}>
                    <Cell xs={3}>
                      <WorkspaceIcon workspace={w} />
                    </Cell>
                    <Cell xs={3}>
                      <Typography>{name}</Typography>
                    </Cell>
                    <Cell xs={3}>
                      <Typography>{claim.name}</Typography>
                    </Cell>
                    <Cell xs={3}>
                      <OutlinedButton onClick={() => add(w, history)}>
                        {resources.Join}
                      </OutlinedButton>
                    </Cell>
                  </Row>
                );
              })}
            </Row>
          </Row>
        )}
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const WorkspaceIndex = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
