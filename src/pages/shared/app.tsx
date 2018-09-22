import * as React from 'react';
import { getInitialStoredState } from '../../services/store-service';
import { connect } from 'react-redux';
import { StoreProvider } from '../../stores/components/store-provider';
import { StateMapper, DispatchMapper } from '../../stores/types';
import { Theme, createTheme } from '../../common/styles/theme';
import { ThemeProvider } from '../../common/styles/components/theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app-router';

interface Props {
  theme: Theme;
}
const Inner: React.SFC<Props> = ({ theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
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
