import * as React from 'react';
import { Hidden, Drawer, createStyles } from '@material-ui/core';
import { Theme } from 'src/common/styles/theme';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { SideMenu } from './side-menu';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { sideMenuActionCreators } from 'src/stores/side-menu/side-menu-reducer';
import { connect } from 'react-redux';

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
    },
  });
interface Props {
  open: boolean;
}
interface Events {
  handleClose: () => void;
}
export const Inner = decorate(styles)<Props & Events>(props => {
  const { children, theme, open, handleClose } = props;
  const classes = getInjectClasses(props);
  const { drawerPaper, content, toolbarDummy, container } = classes;
  const { direction } = Object.assign({}, theme);
  return (
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
          <SideMenu />
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
          <SideMenu />
        </Drawer>
      </Hidden>
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
const mapStateToProps: StateMapper<Props> = ({ sideMenuState }) => {
  const { open } = sideMenuState;
  return {
    open,
  };
};
export const SideMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
