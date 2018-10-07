import {
  createStyles,
  ButtonBase,
  CircularProgress,
  Popover,
} from '@material-ui/core';
import { StyledComponentBase } from 'src/common/styles/types';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import * as React from 'react';
import { Workspace } from 'src/models/accounts/workspace';
import { Theme } from 'src/common/styles/theme';
import { Button } from 'src/components/forms-controls/button';
import { Resources } from 'src/common/location/resources';
import { StateMapperWithRouter, DispatchMapper } from 'src/stores/types';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { delay } from 'src/common/async-helper';
import { Url } from 'src/common/routing/url';
import { History } from 'history';
import { withConnectedRouter } from 'src/common/routing/routing-helper';

const baseStyles = (theme: Theme) =>
  createStyles({ root: {}, btn: { ...theme.shared.workspaceIcon.button } });
interface BaseProps {
  title: string;
  onClick: () => void;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
}
export const WorkspaceIconBase = decorate(baseStyles)<BaseProps>(props => {
  const { children, onClick, onContextMenu, title } = props;
  const { root, btn } = getInjectClasses(props);
  return (
    <div className={root}>
      <ButtonBase
        className={btn}
        focusRipple={true}
        title={title}
        onClick={onClick}
        onContextMenu={e => {
          if (onContextMenu) {
            e.preventDefault();
            onContextMenu(e);
          }
        }}
      >
        {children}
      </ButtonBase>
    </div>
  );
});

interface Props {
  workspace: Workspace;
  resources: Resources;
  history: History;
}
interface OwnProps {
  workspace: Workspace;
}
const mapStateToProps: StateMapperWithRouter<Props, {}, OwnProps> = (
  { accountsState },
  { history, workspace },
) => {
  const { resources } = new AccountsGetters(accountsState);
  return { resources, history, workspace };
};
interface Events {
  onClick: (history: History, workspace: Workspace) => void;
  onCloseWorkspaceClick: (history: History, workspace: Workspace) => void;
  getSrc: (workspace: Workspace) => Promise<string>;
}
const mapDispatchToProps: DispatchMapper<Events, OwnProps> = () => {
  return {
    onClick: (history, workspace) => {
      const { id } = workspace;
      const url = Url.workspaceRoot(id);
      history.push(url);
    },
    getSrc: async () => {
      await delay(1000);
      return 'https://material-ui.com/static/images/grid-list/breakfast.jpg';
    },
    onCloseWorkspaceClick: (history, workspace) => {
      history.push(Url.root);
    },
  };
};
interface State {
  src?: string;
  anchorEl?: HTMLElement;
}
const styles = (theme: Theme) =>
  createStyles({
    root: {},
    btn: {},
    image: { ...theme.shared.workspaceIcon.image },
  });
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public async componentWillMount() {
    const { getSrc, workspace } = this.props;
    const src = await getSrc(workspace);
    this.setState({ src });
  }
  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  private handleClose = () => {
    this.setState({
      anchorEl: undefined,
    });
  };
  private handleCloseWorkspaceClick = () => {
    const { onCloseWorkspaceClick, history, workspace } = this.props;
    onCloseWorkspaceClick(history, workspace);
    this.setState({
      anchorEl: undefined,
    });
  };
  public render() {
    const { workspace, onClick, resources, history } = this.props;
    const { name } = workspace;
    const { src, anchorEl } = this.state;
    const { root, btn, image } = getInjectClasses(this.props);
    const open = Boolean(anchorEl);
    return (
      <WorkspaceIconBase
        title={name}
        onClick={() => onClick(history, workspace)}
        injectClasses={{ root, btn }}
        onContextMenu={this.handleClick}
      >
        {src ? (
          <img src={src} className={image} />
        ) : (
          <CircularProgress className={image} />
        )}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Button onClick={this.handleCloseWorkspaceClick}>
            {resources.CloseWorkspace}
          </Button>
        </Popover>
      </WorkspaceIconBase>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const WorkspaceIcon = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
