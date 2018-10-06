import * as React from 'react';
import { Hidden, Drawer, createStyles } from '@material-ui/core';
import { Theme } from 'src/common/styles/theme';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { SideMenuContent } from './side-menu-content';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { sideMenuActionCreators } from 'src/stores/side-menu/side-menu-reducer';
import { connect } from 'react-redux';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: theme.shared.drawer.width,
      [theme.breakpoints.up('md')]: {
        position: 'relative',
      },
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
    toolbarDummy: theme.mixins.toolbar,
    container: {
      height: '100%',
      overflow: 'auto',
      display: 'flex',
    },
  });
interface Props {
  open: boolean;
  enabled: boolean;
}
interface Events {
  handleClose: () => void;
}
export const Inner = decorate(styles)<Props & Events>(props => {
  const { children, theme, open, handleClose, enabled } = props;
  const classes = getInjectClasses(props);
  const { drawerPaper, content, toolbarDummy, container } = classes;
  const { direction } = Object.assign({}, theme);
  return (
    <React.Fragment>
      {enabled && (
        <React.Fragment>
          <Hidden mdUp={true}>
            <Drawer
              variant="temporary"
              anchor={direction === 'rtl' ? 'right' : 'left'}
              open={open}
              onClose={handleClose}
              classes={{
                paper: drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <SideMenuContent />
            </Drawer>
          </Hidden>
          <Hidden smDown={true} implementation="css">
            <Drawer
              variant="permanent"
              open={true}
              classes={{
                paper: drawerPaper,
              }}
            >
              <SideMenuContent />
            </Drawer>
          </Hidden>
        </React.Fragment>
      )}
      <div className={content}>
        <div className={toolbarDummy} />
        <div className={container}>{children}</div>
      </div>
    </React.Fragment>
  );
});
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    handleClose: () => {
      return dispatch(sideMenuActionCreators.handleClose());
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({
  sideMenuState,
  accountsState,
}) => {
  const { sideMenuEnabled } = new AccountsGetters(accountsState);
  const { open } = sideMenuState;
  return {
    open,
    enabled: sideMenuEnabled,
  };
};
export const SideMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
