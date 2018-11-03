import { Theme as MuiTheme, colors as MuiColors } from '@material-ui/core';
import { ThemeState } from 'src/stores/theme/state';

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

export type Theme = ThemeState & MuiTheme;
