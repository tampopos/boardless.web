import {
  Theme as MuiTheme,
  createMuiTheme,
  colors as MuiColors,
} from '@material-ui/core';
import { FontWeightProperty } from 'csstype';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const colors = {
  amber: MuiColors.amber,
  blue: MuiColors.blue,
  blueGrey: MuiColors.blueGrey,
  brown: MuiColors.brown,
  cyan: MuiColors.cyan,
  deepOrange: MuiColors.deepOrange,
  deepPurple: MuiColors.deepPurple,
  green: MuiColors.green,
  grey: MuiColors.grey,
  indigo: MuiColors.indigo,
  lightBlue: MuiColors.lightBlue,
  lightGreen: MuiColors.lightGreen,
  lime: MuiColors.lime,
  orange: MuiColors.orange,
  pink: MuiColors.pink,
  purple: MuiColors.purple,
  red: MuiColors.red,
  teal: MuiColors.teal,
  yellow: MuiColors.yellow,
};
export type Colors = typeof colors;

export namespace CommonColors {
  export const { white, black } = MuiColors.common;
}
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
const muiThemeOption: ThemeOptions = { palette: { primary: grey, type } };
const themeOption = Object.assign(muiThemeOption, customThemeOption);
export type Theme = typeof customThemeOption & MuiTheme;
export const createTheme = () => {
  return createMuiTheme(themeOption) as Theme;
};
