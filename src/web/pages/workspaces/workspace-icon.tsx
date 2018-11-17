import { createStyles, ButtonBase, CircularProgress } from '@material-ui/core';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import * as React from 'react';
import {
  UserWorkspace,
  WorkspaceBase,
  Workspace,
} from 'src/domains/models/accounts/workspace';
import { Theme } from 'src/infrastructures/styles/theme';
import { Button } from 'src/web/components/forms-controls/button';
import { Resources } from 'src/domains/common/location/resources';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { History } from 'history';
import { ContextMenu } from 'src/web/components/extensions/context-menu';
import { Claim } from 'src/domains/models/accounts/claim';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { EventMapper } from 'src/infrastructures/stores/types';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { Url } from 'src/infrastructures/routing/url';

const baseStyles = (theme: Theme) =>
  createStyles({ root: { ...theme.shared.workspaceIcon.base } });
interface BaseProps {
  title: string;
}
export const WorkspaceIconBase = decorate(baseStyles)<BaseProps>(props => {
  const { title, children, classes } = createPropagationProps(props);
  const { root } = classes;
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
  const {
    children,
    onClick,
    onContextMenu,
    title,
    classes,
  } = createPropagationProps(props);
  const { root } = classes;
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
  workspace: WorkspaceBase;
}
const mapStateToPropsIconInner: StateMapperWithRouter<
  StoredState,
  IconInnerProps,
  {},
  IconInnerOwnProps
> = ({}, { workspace }) => {
  return { workspace };
};
interface IconInnerEvents {
  getSrc: (workspace: WorkspaceBase) => Promise<string>;
}
const mapEventToPropsIconInner: EventMapper<
  IconInnerEvents,
  IconInnerOwnProps
> = () => {
  const { getSrc } = resolve(symbols.workspaceUseCase);
  return {
    getSrc,
  };
};

interface IconInnerState {
  src?: string;
}

const WorkspaceIconInner = withConnectedRouter(
  mapStateToPropsIconInner,
  mapEventToPropsIconInner,
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
        const { classes } = createPropagationProps(this.props);
        const { src } = this.state;
        const { image } = classes;
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
  workspace: Workspace | UserWorkspace;
}
const getTitle = (
  claims: { [index: string]: Claim },
  workspace: Workspace | UserWorkspace,
) => {
  const userWorkSpace = workspace as UserWorkspace;
  if (!userWorkSpace || !userWorkSpace.userId) {
    return workspace.name;
  }
  const claim = claims[userWorkSpace.userId];
  if (!claim || !claim.name) {
    return workspace.name;
  }
  return `${workspace.name}/${claim.name}`;
};
const mapStateToPropsIcon: StateMapperWithRouter<
  StoredState,
  IconProps,
  {},
  IconOwnProps
> = ({ accounts }, { workspace }) => {
  const { claims } = accounts;
  const title = getTitle(claims, workspace);
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
  workspace: UserWorkspace;
  resources: Resources;
  history: History;
  title: string;
}
interface OwnProps {
  workspace: UserWorkspace;
}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  {},
  OwnProps
> = ({ accounts }, { history, workspace }) => {
  const { claims } = accounts;
  const { resources } = new AccountsSelectors(accounts);
  const title = `${workspace.name}/${claims[workspace.userId].name}`;
  return { resources, history, workspace, title };
};
interface Events {
  changeWorkspace: (history: History, workspace: UserWorkspace) => void;
  closeWorkspace: (history: History, workspace: UserWorkspace) => void;
}
const mapEventToProps: EventMapper<Events, OwnProps> = () => {
  const { changeWorkspace, closeWorkspace } = resolve(symbols.workspaceUseCase);
  return {
    changeWorkspace: (history, workspace) => {
      changeWorkspace(workspace);
      const relativeUrl = Url.workspaceRoot(workspace.workspaceUrl);
      history.push(relativeUrl);
    },
    closeWorkspace: (history, workspace) => {
      closeWorkspace(workspace);
      history.push(Url.root);
    },
  };
};
interface State {
  anchorEl?: HTMLElement;
}
const styles = createStyles({
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
    const { closeWorkspace, history, workspace } = this.props;
    closeWorkspace(history, workspace);
    this.setState({
      anchorEl: undefined,
    });
  };
  public render() {
    const {
      workspace,
      changeWorkspace,
      resources,
      history,
      title,
      classes,
    } = createPropagationProps(this.props);
    const { anchorEl } = this.state;
    const { root } = classes;
    const open = Boolean(anchorEl);
    return (
      <WorkspaceIconButtonBase
        title={title}
        onClick={() => !open && changeWorkspace(history, workspace)}
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
  mapEventToProps,
)(StyledInner);
