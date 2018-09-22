import { Colors } from '../theme';
import { createMuiTheme, colors, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';

interface ThemeColorScopeProps {
  themeColor?: keyof Colors;
}
export const ThemeColorScope: React.SFC<ThemeColorScopeProps> = props => {
  const { themeColor, children } = props;
  if (!themeColor) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const theme = createMuiTheme({
    palette: {
      primary: themeColor ? colors[themeColor] : undefined,
    },
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
