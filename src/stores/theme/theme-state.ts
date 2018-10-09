import { FontWeightProperty } from 'csstype';
import { colors, CommonColors, Theme } from 'src/common/styles/theme';
import { createMuiTheme } from '@material-ui/core';

const { grey, indigo, yellow, red, blueGrey, pink } = colors;
const isLight = true;
const primary = grey;
const secondary = pink;
const type = isLight ? 'light' : 'dark';
const muiThemeOption = { palette: { primary, secondary, type } };
const customThemeOption = {
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
      button: {
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
