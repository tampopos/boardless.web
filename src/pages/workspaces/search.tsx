import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Typography, IconButton } from '@material-ui/core';
import * as React from 'react';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { Resources } from 'src/common/location/resources';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { History } from 'history';
import { Workspace } from 'src/models/accounts/workspace';
import { Claim } from 'src/models/accounts/claim';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { OutlinedButton, Button } from 'src/components/forms-controls/button';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { resolve } from 'src/services/common/service-provider';
import { Cell } from 'src/components/layout/cell';
import { WorkspaceIcon } from './workspace-icon';
import { InfinityLoading } from 'src/components/extensions/infinity-loading';
import { Theme } from 'src/common/styles/theme';
import { ContextMenu } from 'src/components/extensions/context-menu';
import { Autocomplete } from 'src/components/forms-controls/autocomplete';
import { delay } from 'src/common/async-helper';
import { Url } from 'src/common/routing/url';
import { parse } from 'query-string';
import { Search } from '@material-ui/icons';

const suggestions = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'British Indian Ocean Territory',
];
const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
      overflowX: 'auto',
    },
    container: {},
    actionButtonRow: {
      justifyContent: 'center',
      marginTop: 25,
      marginBottom: 25,
    },
    autocomplete: { paddingLeft: 16 },
    autocompleteContainer: { width: `calc(100% - ${56}px)` },
    searchButtonContainer: { marginLeft: 'auto', top: -4 },
    infinity: {},
  });
interface Props {
  claims: { [index: string]: Claim };
  resources: Resources;
  history: History;
  joinableWorkspaces: { [index: string]: Workspace };
  fetchCount: number;
  searchKeyword?: string;
}
interface Params {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<Props, Params> = (
  { accountsState, workspacesState },
  { history, location },
) => {
  const { claims } = accountsState;
  const { joinableWorkspaces } = workspacesState;
  const { resources } = new AccountsGetters(accountsState);
  const { searchKeyword } = parse(location.search);
  return {
    claims,
    resources,
    history,
    joinableWorkspaces,
    searchKeyword: searchKeyword ? searchKeyword.toString() : undefined,
    fetchCount: 50,
  };
};
interface Events {
  getJoinableWorkspaces: (
    searchKeyword: string | undefined,
    clear: boolean,
    count: number,
    fetchCount: number,
  ) => Promise<boolean>;
  join: (workspace: Workspace, claim: Claim, history: History) => void;
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  const { getJoinableWorkspaces, join } = resolve('workspaceService');
  return { getJoinableWorkspaces, join };
};
interface State {
  searchKeyword?: string;
  loadCompleted: boolean;
  scrollContainer: HTMLDivElement | null;
  trigger?: (init: boolean) => Promise<void>;
  openJoinContextMenu?: { targetWorkspace: Workspace; anchorEl: HTMLElement };
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    const { searchKeyword } = this.props;
    this.state = {
      searchKeyword,
      loadCompleted: false,
      scrollContainer: null,
    };
  }
  private nextWorkspacesAsync = async (init: boolean) => {
    const {
      getJoinableWorkspaces,
      fetchCount,
      joinableWorkspaces,
    } = this.props;
    const { searchKeyword, loadCompleted } = this.state;
    const joinableWorkspacesArray = Object.entries(joinableWorkspaces);
    const completed = await getJoinableWorkspaces(
      searchKeyword,
      init,
      init ? 0 : joinableWorkspacesArray.length,
      fetchCount,
    );
    if (completed || (init && !completed && loadCompleted)) {
      this.setState({ loadCompleted: completed });
    }
  };
  private search = async () => {
    const { history } = this.props;
    const { searchKeyword, trigger } = this.state;
    if (this.props.searchKeyword !== searchKeyword) {
      history.push(Url.searchWorkspaces(searchKeyword));
      if (trigger) {
        await trigger(true);
      }
    }
  };
  private changeSearchKeyword(searchKeyword: string) {
    this.setState({ searchKeyword });
  }
  private handleClose = () => {
    this.setState({
      openJoinContextMenu: undefined,
    });
  };
  private clickJoin = (workspace: Workspace) => (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    const { claims, join, history } = this.props;
    const claimsArray = Object.entries(claims);
    if (claimsArray.length === 0) {
      join(workspace, claimsArray[0][1], history);
    } else if (claimsArray.length > 1) {
      this.setState({
        openJoinContextMenu: {
          targetWorkspace: workspace,
          anchorEl: event.currentTarget,
        },
      });
    }
  };
  private setScrollContainer = (scrollContainer: HTMLDivElement | null) => {
    this.setState({ scrollContainer });
  };
  private getSuggestionsAsync = async (value: string) => {
    await delay(100);
    return suggestions.filter(x => x.indexOf(value) > -1).slice(0, 5);
  };
  public render() {
    const {
      classes,
      resources,
      joinableWorkspaces,
      claims,
      join,
      history,
    } = this.props;
    const {
      searchKeyword,
      loadCompleted,
      openJoinContextMenu,
      scrollContainer,
    } = this.state;
    const {
      root,
      container,
      actionButtonRow,
      infinity,
      autocomplete,
      autocompleteContainer,
      searchButtonContainer,
    } = classes;
    const claimsArray = Object.entries(claims);
    const joinableWorkspacesArray = Object.entries(joinableWorkspaces);
    return (
      <div className={root} ref={this.setScrollContainer}>
        <Container className={container}>
          <Row>
            <Typography variant="h4">{resources.JoinWorkspace}</Typography>
          </Row>
          <Row className={actionButtonRow}>
            <div className={autocompleteContainer}>
              <Autocomplete
                textBoxProps={{ color: 'primary' }}
                value={searchKeyword}
                onChange={v => this.changeSearchKeyword(v)}
                getSuggestionsAsync={this.getSuggestionsAsync}
                injectClasses={{ popper: autocomplete }}
              />
            </div>
            <div className={searchButtonContainer}>
              <IconButton onClick={this.search}>
                <Search fontSize="small" />
              </IconButton>
            </div>
          </Row>
          <Row>
            <Typography variant="h6">{resources.JoinableWorkspace}</Typography>
          </Row>
          <InfinityLoading
            loadCompleted={loadCompleted}
            next={this.nextWorkspacesAsync}
            className={infinity}
            anchorElm={scrollContainer}
            getExternalTrigger={trigger => this.setState({ trigger })}
          >
            {joinableWorkspacesArray.map(x => {
              const w = x[1];
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
                    <OutlinedButton onClick={this.clickJoin(w)}>
                      {resources.Join}
                    </OutlinedButton>
                  </Cell>
                </Row>
              );
            })}
          </InfinityLoading>
          {claimsArray.length > 0 && (
            <ContextMenu
              open={Boolean(openJoinContextMenu)}
              anchorEl={openJoinContextMenu && openJoinContextMenu.anchorEl}
              onClose={this.handleClose}
            >
              {claimsArray.map(c => {
                const claim = c[1];
                return (
                  <Button
                    key={claim.userId}
                    onClick={() => {
                      if (openJoinContextMenu) {
                        join(
                          openJoinContextMenu.targetWorkspace,
                          claim,
                          history,
                        );
                      }
                      this.handleClose();
                    }}
                  >
                    {resources.JoinAs(claim.name)}
                  </Button>
                );
              })}
            </ContextMenu>
          )}
        </Container>
      </div>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const WorkspaceSearch = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
