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
import { TextBox } from 'src/components/forms-controls/text-box';

const styles = createStyles({
  root: { padding: 10, alignSelf: 'flex-start' },
  row: {
    paddingBottom: 10,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  actionButtonRow: { justifyContent: 'center', marginTop: 50 },
  listRow: { marginTop: 30, paddingLeft: 30, paddingRight: 30 },
});
interface Props {
  claims: { [index: string]: Claim };
  resources: Resources;
  history: History;
  joinableWorkspaces: Workspace[];
}
interface Params {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<Props, Params> = (
  { accountsState, workspacesState },
  { history },
) => {
  const { claims } = accountsState;
  const { joinableWorkspaces } = workspacesState;
  const { resources } = new AccountsGetters(accountsState);
  return {
    claims,
    resources,
    history,
    joinableWorkspaces,
  };
};
interface Events {
  getJoinableWorkspaces: (searchKeyword: string) => void;
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  const { getJoinableWorkspaces } = resolve('workspaceService');
  return { getJoinableWorkspaces };
};
interface State {
  searchKeyword: string;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = { searchKeyword: '' };
  }
  public async componentDidMount() {
    const { getJoinableWorkspaces } = this.props;
    const { searchKeyword } = this.state;
    getJoinableWorkspaces(searchKeyword);
  }
  private changeSearchKeyword(searchKeyword: string) {
    this.setState({ searchKeyword });
  }
  public render() {
    const { classes, resources, joinableWorkspaces } = this.props;
    const { searchKeyword } = this.state;
    const { root, row, actionButtonRow, listRow } = classes;
    return (
      <Container className={root}>
        <Row className={row}>
          <Typography variant="display1">{resources.JoinWorkspace}</Typography>
        </Row>
        <Row className={appendClassName(row, actionButtonRow)}>
          <TextBox
            color="primary"
            value={searchKeyword}
            onChange={e => this.changeSearchKeyword(e.currentTarget.value)}
          />
        </Row>
        <Row className={appendClassName(row, listRow)}>
          <Row>
            <Typography variant="title">
              {resources.JoinableWorkspace}
            </Typography>
          </Row>
          <Row>
            {joinableWorkspaces.map(w => {
              const { workspaceUrl, name } = w;
              return (
                <Row key={workspaceUrl}>
                  <Cell xs={4}>
                    <WorkspaceIcon workspace={w} />
                  </Cell>
                  <Cell xs={4}>
                    <Typography>{name}</Typography>
                  </Cell>
                  <Cell xs={4}>
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
export const WorkspaceSearch = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
