import { Theme as MuiTheme, colors as MuiColors } from '@material-ui/core';
import { FontWeightProperty } from 'csstype';

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

const { grey, indigo, yellow, red, blueGrey, pink } = colors;
const isLight = true;
const primary = grey;
const secondary = pink;
const type = isLight ? 'light' : 'dark';
const muiThemeOption = { palette: { primary, secondary, type } };
const customThemeOption = {
  typography: {
    useNextVariants: true,
  },
  shared: {
    fontWeight: { bold: 'bold' as FontWeightProperty },
    borderWidth: { thick: 4 },
    table: {
      headerBackgroundColor: isLight ? primary['900'] : primary['50'],
      borderColor: isLight ? primary['400'] : primary['500'],
      headerColor: isLight ? CommonColors.white : CommonColors.black,
      oddBackgroundColor: isLight ? primary['200'] : primary['900'],
      hoverBackgroundColor: isLight ? primary['300'] : primary['800'],
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
    drawer: { width: 320 },
    workspaceIcon: {
      image: {
        width: 40,
        height: 40,
      },
      base: {
        width: 52,
        height: 52,
        borderStyle: 'solid',
        borderWidth: 4,
        padding: 2,
        borderRadius: 8,
        borderColor: isLight ? grey['300'] : grey['700'],
        backgroundColor: isLight ? grey['50'] : grey['300'],
      },
      selectedButton: {
        borderColor: isLight ? secondary['500'] : secondary['200'],
        borderWidth: 4,
      },
    },
  },
};
export const defaultThemeOption = {
  ...muiThemeOption,
  ...customThemeOption,
};
export type ThemeOption = typeof defaultThemeOption;

export type Theme = ThemeOption & MuiTheme;
