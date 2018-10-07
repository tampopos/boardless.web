import { createMuiTheme, colors, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { Colors, Theme } from 'src/common/styles/theme';
import { decorate } from 'src/common/styles/styles-helper';

interface ThemeColorScopeProps {
  themeColor?: keyof Colors;
}

export const ThemeColorScope = decorate((theme: Theme) => ({}))<
  ThemeColorScopeProps
>(props => {
  const { themeColor, children, theme } = props;
  if (!themeColor) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const appendOption = {
    palette: {
      primary: themeColor ? colors[themeColor] : undefined,
    },
  };
  const option = theme
    ? Object.assign({}, theme, {
        palette: Object.assign({}, theme.palette, appendOption.palette),
      })
    : appendOption;
  const newTheme = createMuiTheme(option);
  return <MuiThemeProvider theme={newTheme}>{children}</MuiThemeProvider>;
});
