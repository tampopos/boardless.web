import { createStyles, ButtonBase, CircularProgress } from '@material-ui/core';
import { StyledComponentBase } from 'src/common/styles/types';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import * as React from 'react';
import { Workspace } from 'src/models/accounts/workspace';
import { Theme } from 'src/common/styles/theme';
import { Button } from 'src/components/forms-controls/button';
import { Resources } from 'src/common/location/resources';
import { StateMapperWithRouter, DispatchMapper } from 'src/stores/types';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { History } from 'history';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { resolve } from 'src/services/common/service-provider';
import { ContextMenu } from 'src/components/extensions/context-menu';

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
  title: string;
}
interface OwnProps {
  workspace: Workspace;
}
const mapStateToProps: StateMapperWithRouter<Props, {}, OwnProps> = (
  { accountsState },
  { history, workspace },
) => {
  const { claims } = accountsState;
  const { resources } = new AccountsGetters(accountsState);
  const title = `${workspace.name}/${claims[workspace.userId].name}`;
  return { resources, history, workspace, title };
};
interface Events {
  onClick: (history: History, workspace: Workspace) => void;
  onCloseWorkspaceClick: (history: History, workspace: Workspace) => void;
  getSrc: (workspace: Workspace) => Promise<string>;
}
const mapDispatchToProps: DispatchMapper<Events, OwnProps> = () => {
  const { onClick, getSrc, onCloseWorkspaceClick } = resolve(
    'workspaceService',
  );
  return {
    onClick,
    getSrc,
    onCloseWorkspaceClick,
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
  private disposing = false;
  public async componentDidMount() {
    const { getSrc, workspace } = this.props;
    const src = await getSrc(workspace);
    if (!this.disposing) {
      this.setState({ src });
    }
  }
  public componentWillUnmount() {
    this.disposing = true;
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
    const { workspace, onClick, resources, history, title } = this.props;
    const { src, anchorEl } = this.state;
    const { root, btn, image } = getInjectClasses(this.props);
    const open = Boolean(anchorEl);
    return (
      <WorkspaceIconBase
        title={title}
        onClick={() => onClick(history, workspace)}
        injectClasses={{ root, btn }}
        onContextMenu={this.handleClick}
      >
        {src ? (
          <img src={src} className={image} />
        ) : (
          <CircularProgress className={image} />
        )}
        <ContextMenu open={open} anchorEl={anchorEl} onClose={this.handleClose}>
          <Button onClick={this.handleCloseWorkspaceClick}>
            {resources.CloseWorkspace}
          </Button>
        </ContextMenu>
      </WorkspaceIconBase>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const WorkspaceIcon = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
