import * as React from 'react';
import { Hidden, Drawer, createStyles } from '@material-ui/core';
import { Theme } from 'src/common/styles/theme';
import { decorate } from 'src/common/styles/styles-helper';
import { SideMenuContent } from './side-menu-content';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { AccountsSelectors } from 'src/stores/accounts/selectors';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { createPropagationProps } from 'src/common/component-helper';
import { handleClose } from 'src/stores/side-menu/action-creators';

const styles = (theme: Theme) =>
  createStyles({
    drawerDocked: {
      height: '100%',
    },
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
      display: 'flex',
      height: `calc(100% - ${56}px)`,
      overflowX: 'auto',
      alignSelf: 'center',
      '& > div': {
        alignContent: 'flex-start',
      },
      [theme.breakpoints.up('sm')]: {
        height: `calc(100% - ${64}px)`,
      },
    },
  });
interface Props {
  open: boolean;
  enabled: boolean;
}
interface Events {
  close: () => void;
}
const Content: React.SFC = () => {
  return <SideMenuContent />;
};
export const Inner = decorate(styles)<Props & Events>(props => {
  const { children, open, close, enabled, classes } = createPropagationProps(
    props,
  );
  const {
    drawerDocked,
    drawerPaper,
    content,
    toolbarDummy,
    container,
  } = classes;
  const { direction } = Object.assign({}, props.theme);
  return (
    <React.Fragment>
      {enabled && (
        <React.Fragment>
          <Hidden mdUp={true}>
            <Drawer
              variant="temporary"
              anchor={direction === 'rtl' ? 'right' : 'left'}
              open={open}
              onClose={close}
              classes={{
                docked: drawerDocked,
                paper: drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <Content />
            </Drawer>
          </Hidden>
          <Hidden smDown={true} implementation="css">
            <Drawer
              variant="permanent"
              open={true}
              classes={{
                docked: drawerDocked,
                paper: drawerPaper,
              }}
            >
              <Content />
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
    close: () => {
      return dispatch(handleClose());
    },
  };
};
const mapStateToProps: StateMapperWithRouter<Props> = ({
  sideMenu,
  accounts,
}) => {
  const { sideMenuEnabled } = new AccountsSelectors(accounts);
  const { open } = sideMenu;
  return {
    open,
    enabled: sideMenuEnabled,
  };
};
export const SideMenuContainer = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
