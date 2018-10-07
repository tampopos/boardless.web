import {
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from 'src/common/styles/styles-helper';
import { StyledComponentBase } from 'src/common/styles/types';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import * as React from 'react';
import { StateMapper, DispatchMapper } from 'src/stores/types';
import { Resources } from 'src/common/location/resources';
import { accountsActionCreators } from 'src/stores/accounts/accounts-reducer';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
import { Url } from 'src/common/routing/url';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { Theme } from 'src/common/styles/theme';
import { sideMenuActionCreators } from 'src/stores/side-menu/side-menu-reducer';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
    },
    sideMenuEnabledRoot: {
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.shared.drawer.width,
        width: `calc(100% - ${theme.shared.drawer.width}px)`,
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  });
interface State {
  anchorEl?: EventTarget & HTMLElement;
}
interface Props {
  resources: Resources;
  authenticated: boolean;
  sideMenuEnabled: boolean;
}
interface Events {
  signOut: (history: History) => void;
  handleOpenMenu: () => void;
}
class Inner extends StyledComponentBase<
  typeof styles,
  Props & Events & RouteComponentProps<{}>,
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = (func?: () => void) => () => {
    if (func) {
      func();
    }
    this.setState({ anchorEl: undefined });
  };
  public render() {
    const {
      authenticated,
      resources,
      signOut,
      history,
      handleOpenMenu,
      sideMenuEnabled,
    } = this.props;
    const { anchorEl } = this.state;
    const { root, menuButton, grow, sideMenuEnabledRoot } = getInjectClasses(
      this.props,
    );
    const open = Boolean(anchorEl);
    return (
      <AppBar
        position="static"
        className={appendClassName(
          root,
          sideMenuEnabled ? sideMenuEnabledRoot : '',
        )}
      >
        <Toolbar>
          {sideMenuEnabled && (
            <IconButton
              className={menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="title" color="inherit" className={grow}>
            Boardless
          </Typography>
          {authenticated && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose()}
              >
                <MenuItem onClick={this.handleClose()}>
                  {resources.Profile}
                </MenuItem>
                <MenuItem onClick={this.handleClose(() => signOut(history))}>
                  {resources.SignOut}
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { resources, authenticated, sideMenuEnabled } = new AccountsGetters(
    accountsState,
  );
  return { resources, authenticated, sideMenuEnabled };
};
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    signOut: (history: History) => {
      dispatch(accountsActionCreators.signIn({ result: {} }));
      history.push(Url.root);
    },
    handleOpenMenu: () => {
      dispatch(sideMenuActionCreators.handleOpen());
    },
  };
};
const StyledInner = decorate(styles)(Inner);
export const AppTop = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
