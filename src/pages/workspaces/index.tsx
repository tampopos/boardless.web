import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { Resources } from 'src/common/location/resources';
import { decorate, appendClassName } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { History } from 'history';
import { Workspace } from 'src/models/accounts/workspace';
import { Claim } from 'src/models/accounts/claim';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { OutlinedButton } from 'src/components/forms-controls/button';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { resolve } from 'src/services/common/service-provider';
import { Cell } from 'src/components/layout/cell';
import { WorkspaceIcon } from './workspace-icon';

const styles = createStyles({
  root: { padding: 10, alignSelf: 'flex-start' },
  row: {
    paddingBottom: 10,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  actionButtonRow: { justifyContent: 'center', marginTop: 50 },
  btn: { width: 200, marginRight: 20, marginLeft: 20 },
  listRow: { marginTop: 30, paddingLeft: 30, paddingRight: 30 },
});
interface Props {
  resources: Resources;
  workspaces: { [index: string]: Workspace };
  claims: { [index: string]: Claim };
  history: History;
  invitedWorkspaces: Workspace[];
}
const mapStateToProps: StateMapperWithRouter<Props, { workspaceId: string }> = (
  { accountsState, workspacesState },
  { match, history, location },
) => {
  const { workspaces, claims } = accountsState;
  const { invitedWorkspaces } = workspacesState;
  const { workspaceId } = match.params;
  const { resources } = new AccountsGetters(accountsState);
  const { pathname } = location;
  return {
    workspaces,
    claims,
    resources,
    workspaceId,
    history,
    pathname,
    invitedWorkspaces,
  };
};
interface Events {
  getInvitedWorkspaces: (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: Workspace },
  ) => void;
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  const { getInvitedWorkspaces } = resolve('workspaceService');
  return { getInvitedWorkspaces };
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
    const { classes, resources, invitedWorkspaces, claims } = this.props;
    const { root, row, actionButtonRow, btn, listRow } = classes;
    return (
      <Container className={root}>
        <Row className={row}>
          <Typography variant="display1">
            {resources.AddingWorkspace}
          </Typography>
        </Row>
        <Row className={appendClassName(row, actionButtonRow)}>
          <OutlinedButton color="primary" className={btn}>
            {resources.AddNewWorkspace}
          </OutlinedButton>
          <OutlinedButton color="secondary" className={btn}>
            {resources.JoinWorkspace}
          </OutlinedButton>
        </Row>
        <Row className={appendClassName(row, listRow)}>
          <Row>
            <Typography variant="title">
              {resources.InvitedWorkspace}
            </Typography>
          </Row>
          <Row>
            {invitedWorkspaces.map(w => {
              const { id, userId, name } = w;
              const claim = claims[userId];
              return (
                <Row key={JSON.stringify({ id, userId })}>
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
                    <OutlinedButton>{resources.Join}</OutlinedButton>
                  </Cell>
                </Row>
              );
            })}
          </Row>
        </Row>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const WorkspaceIndex = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
