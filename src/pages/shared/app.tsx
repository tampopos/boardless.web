import * as React from 'react';
import { getInitialStoredState } from '../../services/store-service';
import { connect } from 'react-redux';
import { StateMapper, DispatchMapper } from '../../stores/types';
import { Theme, createTheme } from '../../common/styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';
import { ThemeProvider } from 'src/components/styles/theme-provider';
import { StoreProvider } from 'src/components/stores/store-provider';
import { AppTop } from './app-top';
import { AuthenticateProvider } from './authenticate-provider';

interface Props {
  theme: Theme;
}
const Inner: React.SFC<Props> = ({ theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthenticateProvider>
          <AppTop />
          <AppRouter />
        </AuthenticateProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
const mapDispatchToProps: DispatchMapper<{}> = dispatch => {
  return {};
};
const mapStateToProps: StateMapper<Props> = state => ({
  theme: createTheme(),
});
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
