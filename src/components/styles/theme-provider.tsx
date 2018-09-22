import * as React from 'react';
import { JssProvider, ThemeProvider as JssThemeProvider, jss } from 'react-jss';
import { MuiThemeProvider, CssBaseline, Theme } from '@material-ui/core';
import { GlobalStyle } from './global-style';

export const ThemeProvider: React.SFC<{ theme: Theme }> = ({
  theme,
  children,
}) => (
  <JssProvider jss={jss}>
    <JssThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <React.Fragment>
          <CssBaseline />
          {children}
        </React.Fragment>
      </MuiThemeProvider>
    </JssThemeProvider>
  </JssProvider>
);
