import * as React from 'react';
import { JssProvider, ThemeProvider as JssThemeProvider, jss } from 'react-jss';
import { Theme } from '../theme';

export const ThemeProvider: React.SFC<{ theme: Theme }> = props => (
  <JssProvider jss={jss}>
    <JssThemeProvider theme={props.theme}>{props.children}</JssThemeProvider>
  </JssProvider>
);
