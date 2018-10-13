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
  createStyles({ root: { ...theme.shared.workspaceIcon.base } });
interface BaseProps {
  title: string;
}
export const WorkspaceIconBase = decorate(baseStyles)<BaseProps>(props => {
  const { children, title } = props;
  const { root } = getInjectClasses(props);
  return (
    <div className={root} title={title}>
      {children}
    </div>
  );
});
const buttonBaseStyles = (theme: Theme) =>
  createStyles({ root: { ...theme.shared.workspaceIcon.base } });
interface ButtonBaseProps {
  title: string;
  onClick: () => void;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
}
export const WorkspaceIconButtonBase = decorate(buttonBaseStyles)<
  ButtonBaseProps
>(props => {
  const { children, onClick, onContextMenu, title } = props;
  const { root } = getInjectClasses(props);
  return (
    <ButtonBase
      className={root}
      title={title}
      focusRipple={true}
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
  );
});

const iconInnerStyles = (theme: Theme) =>
  createStyles({
    image: { ...theme.shared.workspaceIcon.image },
  });
interface IconInnerProps {}
interface IconInnerOwnProps {
  workspace: Workspace;
}
const mapStateToPropsIconInner: StateMapperWithRouter<
  IconInnerProps,
  {},
  IconInnerOwnProps
> = ({}, { workspace }) => {
  return { workspace };
};
interface IconInnerEvents {
  getSrc: (workspace: Workspace) => Promise<string>;
}
const mapDispatchToPropsIconInner: DispatchMapper<
  IconInnerEvents,
  IconInnerOwnProps
> = () => {
  const { getSrc } = resolve('workspaceService');
  return {
    getSrc,
  };
};

interface IconInnerState {
  src?: string;
}

const WorkspaceIconInner = withConnectedRouter(
  mapStateToPropsIconInner,
  mapDispatchToPropsIconInner,
)(
  decorate(iconInnerStyles)<IconInnerProps>(
    class extends StyledComponentBase<
      typeof iconInnerStyles,
      IconInnerProps & IconInnerOwnProps & IconInnerEvents,
      IconInnerState
    > {
      constructor(props: any) {
        super(props);
        this.state = {};
      }
      public async componentDidMount() {
        const { getSrc, workspace } = this.props;
        const src = await getSrc(workspace);
        if (!this.disposing) {
          this.setState({ src });
        }
      }
      private disposing = false;
      public componentWillUnmount() {
        this.disposing = true;
      }
      public render() {
        const { src } = this.state;
        const { image } = getInjectClasses(this.props);
        return src ? (
          <img src={src} className={image} />
        ) : (
          <CircularProgress className={image} />
        );
      }
    },
  ),
);
const iconStyles = createStyles({
  image: {},
});
interface IconProps {
  title: string;
}
interface IconOwnProps {
  workspace: Workspace;
}
const mapStateToPropsIcon: StateMapperWithRouter<
  IconProps,
  {},
  IconOwnProps
> = ({ accountsState }, { workspace }) => {
  const { claims } = accountsState;
  const title = `${workspace.name}/${claims[workspace.userId].name}`;
  return { workspace, title };
};
export const WorkspaceIcon = withConnectedRouter(mapStateToPropsIcon)(
  decorate(iconStyles)<IconProps & IconOwnProps>(props => {
    const { title, workspace } = props;
    return (
      <WorkspaceIconBase title={title}>
        <WorkspaceIconInner workspace={workspace} />
      </WorkspaceIconBase>
    );
  }),
);
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
}
const mapDispatchToProps: DispatchMapper<Events, OwnProps> = () => {
  const { onClick, onCloseWorkspaceClick } = resolve('workspaceService');
  return {
    onClick,
    onCloseWorkspaceClick,
  };
};
interface State {
  anchorEl?: HTMLElement;
}
const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
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
    const { anchorEl } = this.state;
    const { root } = getInjectClasses(this.props);
    const open = Boolean(anchorEl);
    return (
      <WorkspaceIconButtonBase
        title={title}
        onClick={() => onClick(history, workspace)}
        injectClasses={{ root }}
        onContextMenu={this.handleClick}
      >
        <WorkspaceIconInner workspace={workspace} />
        <ContextMenu open={open} anchorEl={anchorEl} onClose={this.handleClose}>
          <Button onClick={this.handleCloseWorkspaceClick}>
            {resources.CloseWorkspace}
          </Button>
        </ContextMenu>
      </WorkspaceIconButtonBase>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const WorkspaceIconButton = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
