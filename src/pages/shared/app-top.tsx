import {
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { StyledComponentBase } from 'src/common/styles/types';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';

import * as React from 'react';
import { StateMapper } from 'src/stores/types';
import { connect } from 'react-redux';
import { resolve } from 'src/common/service-provider';

const styles = createStyles({
  root: {},
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
interface State {
  anchorEl?: EventTarget & HTMLElement;
}
interface Props {
  authenticated: boolean;
}
class Inner extends StyledComponentBase<typeof styles, Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorEl: undefined });
  };
  public render() {
    const { authenticated } = this.props;
    const { anchorEl } = this.state;
    const { root, menuButton, grow } = getInjectClasses(this.props);
    const open = Boolean(anchorEl);
    return (
      <AppBar position="static" className={root}>
        <Toolbar>
          <IconButton className={menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={grow}>
            Photos
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
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const StyledInner = decorate(styles)(Inner);
const mapStateToProps: StateMapper<Props> = ({ authenticateState }) => {
  return {
    authenticated: resolve('authenticateService').isAuthenticated(
      authenticateState,
    ),
  };
};
export const AppTop = connect(mapStateToProps)(StyledInner);
