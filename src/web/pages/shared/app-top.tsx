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
  appendClassName,
} from 'src/infrastructures/styles/styles-helper';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import * as React from 'react';
import { DispatchMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { History } from 'history';
import { Url } from 'src/infrastructures/routing/url';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { Theme } from 'src/infrastructures/styles/theme';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { signIn } from 'src/infrastructures/stores/accounts/action-creators';
import { handleOpen } from 'src/infrastructures/stores/side-menu/action-creators';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';

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
  history: History;
}
interface Events {
  signOut: (history: History) => void;
  handleOpenMenu: () => void;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
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
      classes,
    } = createPropagationProps(this.props);
    const { anchorEl } = this.state;
    const { root, menuButton, grow, sideMenuEnabledRoot } = classes;
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
          <Typography variant="h6" color="inherit" className={grow}>
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
                <MenuItem
                  onClick={this.handleClose(() => history.push(Url.signIn))}
                >
                  {resources.SignInAsAnotherUser}
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

const mapStateToProps: StateMapperWithRouter<StoredState, Props> = (
  { accounts },
  { history },
) => {
  const { resources, authenticated, sideMenuEnabled } = new AccountsSelectors(
    accounts,
  );
  return { resources, authenticated, sideMenuEnabled, history };
};
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    signOut: (history: History) => {
      dispatch(signIn({ result: {} }));
      history.push(Url.root);
    },
    handleOpenMenu: () => {
      dispatch(handleOpen());
    },
  };
};
const StyledInner = decorate(styles)(Inner);
export const AppTop = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
