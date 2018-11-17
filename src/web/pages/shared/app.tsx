import * as React from 'react';
import { connect } from 'react-redux';
import { Theme } from 'src/infrastructures/styles/theme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'src/web/components/styles/theme-provider';
import { StoreProvider } from 'src/web/pages/shared/store-provider';
import { AppTop } from './app-top';
import { AuthenticateProvider } from './accounts/authenticate-provider';
import {
  getInitialStoredState,
  StoredState,
} from 'src/infrastructures/stores/stored-state';
import { AppBody } from './app-body';
import { ThemeSelectors } from 'src/infrastructures/stores/theme/selectors';
import { createBrowserHistory } from 'history';
import { EventMapper } from 'src/infrastructures/stores/types';

interface Props {
  theme: Theme;
}
const history = createBrowserHistory();
const Inner: React.SFC<Props> = ({ theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <React.Fragment>
          <AuthenticateProvider>
            <AppTop />
            <AppBody />
          </AuthenticateProvider>
        </React.Fragment>
      </Router>
    </ThemeProvider>
  );
};
const mapEventToProps: EventMapper<{}> = () => {
  return {};
};
const mapStateToProps = ({ theme }: StoredState) => {
  const { createTheme } = new ThemeSelectors(theme);
  return {
    theme: createTheme(),
  };
};
const initialState = getInitialStoredState();
const ConnectedInner = connect(
  mapStateToProps,
  mapEventToProps,
)(Inner);
export const App: React.SFC<{}> = () => {
  return (
    <StoreProvider initialState={initialState}>
      <ConnectedInner />
    </StoreProvider>
  );
};
