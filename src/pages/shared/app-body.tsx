import * as React from 'react';
import { AppRouter } from './app-router';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { createStyles } from '@material-ui/core';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { AppMessages } from './app-message';
import { SignIn } from './sign-in';
import { StateMapper } from 'src/stores/types';
import { resolve } from 'src/common/di/service-provider';

const styles = createStyles({
  root: {
    position: 'relative',
  },
});
interface Props {
  authenticated: boolean;
}
const Inner = decorate(styles)<Props & RouteComponentProps<{}>>(props => {
  const { authenticated } = props;
  const { root } = getInjectClasses(props);
  return (
    <div className={root}>
      <AppMessages />
      {authenticated ? <AppRouter /> : <SignIn />}
    </div>
  );
});
const mapStateToProps: StateMapper<Props> = ({ authenticateState }) => ({
  authenticated: resolve('authenticateService').isAuthenticated(
    authenticateState,
  ),
});
export const AppBody = withRouter<RouteComponentProps<{}>>(
  connect(mapStateToProps)(Inner),
);
