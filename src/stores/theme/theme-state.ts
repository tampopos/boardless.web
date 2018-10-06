import { FontWeightProperty } from 'csstype';
import { colors, CommonColors, Theme } from 'src/common/styles/theme';
import { createMuiTheme } from '@material-ui/core';

const { grey, indigo, yellow, red, blueGrey } = colors;
const isLight = true;
const type = isLight ? 'light' : 'dark';
const customThemeOption = {
  shared: {
    fontWeight: { bold: 'bold' as FontWeightProperty },
    borderWidth: { thick: 4 },
    table: {
      headerBackgroundColor: isLight ? grey['900'] : grey['50'],
      borderColor: isLight ? grey['400'] : grey['500'],
      headerColor: isLight ? CommonColors.white : CommonColors.black,
      oddBackgroundColor: isLight ? grey['200'] : grey['900'],
      hoverBackgroundColor: isLight ? grey['300'] : grey['800'],
      selectedBackgroundColor: isLight ? blueGrey['100'] : blueGrey['700'],
    },
    messages: {
      info: {
        color: isLight ? indigo['700'] : indigo['300'],
      },
      warning: {
        color: isLight ? yellow['800'] : yellow['500'],
      },
      error: {
        color: isLight ? red['700'] : red['500'],
      },
    },
    drawer: { width: 240 },
  },
};
const muiThemeOption = { palette: { primary: grey, type } };
export const defaultThemeState = Object.assign(
  muiThemeOption,
  customThemeOption,
);
export type ThemeState = typeof defaultThemeState;
export class ThemeGetters {
  constructor(private state: ThemeState) {}
  public createTheme = () => {
    return createMuiTheme(this.state as Theme) as Theme;
  };
}
