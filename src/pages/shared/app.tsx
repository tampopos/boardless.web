import * as React from 'react';
import { connect } from 'react-redux';
import { StateMapper, DispatchMapper } from '../../stores/types';
import { Theme } from '../../common/styles/theme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'src/components/styles/theme-provider';
import { StoreProvider } from 'src/pages/shared/store-provider';
import { AppTop } from './app-top';
import { AuthenticateProvider } from './accounts/authenticate-provider';
import { getInitialStoredState } from 'src/stores/stored-state';
import { AppBody } from './app-body';
import { ThemeGetters } from 'src/stores/theme/theme-state';
import { createBrowserHistory } from 'history';
import { Xxx } from '../bar/test';

interface Props {
  theme: Theme;
}
const history = createBrowserHistory();
const Inner: React.SFC<Props> = ({ theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <React.Fragment>
          <Xxx />
          <AuthenticateProvider>
            <AppTop />
            <AppBody />
          </AuthenticateProvider>
        </React.Fragment>
      </Router>
    </ThemeProvider>
  );
};
const mapDispatchToProps: DispatchMapper<{}> = () => {
  return {};
};
const mapStateToProps: StateMapper<Props> = ({ themeState }) => {
  const { createTheme } = new ThemeGetters(themeState);
  return {
    theme: createTheme(),
  };
};
const initialState = getInitialStoredState();
const ConnectedInner = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
export const App: React.SFC<{}> = () => {
  return (
    <StoreProvider initialState={initialState}>
      <ConnectedInner />
    </StoreProvider>
  );
};
