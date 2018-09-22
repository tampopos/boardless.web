import * as React from 'react';
import { JssProvider, ThemeProvider as JssThemeProvider, jss } from 'react-jss';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { Theme } from '../theme';

export const ThemeProvider: React.SFC<{ theme: Theme }> = ({
  theme,
  children,
}) => (
  <JssProvider jss={jss}>
    <JssThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          {children}
        </React.Fragment>
      </MuiThemeProvider>
    </JssThemeProvider>
  </JssProvider>
);
