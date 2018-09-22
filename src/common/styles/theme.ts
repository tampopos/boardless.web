import {
  Theme as MuiTheme,
  createMuiTheme,
  Color,
  colors as MuiColors,
} from '@material-ui/core';

interface Parameter {
  formControl: {
    color: string;
    borderColor: string;
  };
}
export interface CustomTheme {
  mono: Parameter;
  blue: Parameter;
  red: Parameter;
  shared: {
    fontWeight: {
      bold: string;
    };
    borderWidth: {
      thick: number;
    };
    table: {
      headerBackgroundColor: string;
      headerColor: string;
      borderColor: string;
    };
  };
}
export interface Theme extends CustomTheme, MuiTheme {}
export interface Colors {
  amber: Color;
  blue: Color;
  blueGrey: Color;
  brown: Color;
  cyan: Color;
  deepOrange: Color;
  deepPurple: Color;
  green: Color;
  grey: Color;
  indigo: Color;
  lightBlue: Color;
  lightGreen: Color;
  lime: Color;
  orange: Color;
  pink: Color;
  purple: Color;
  red: Color;
  teal: Color;
  yellow: Color;
}
export const colors: Colors = {
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
export namespace CommonColors {
  export const { white, black } = MuiColors.common;
}
export const createTheme = () => {
  const { grey, indigo, pink } = colors;
  return createMuiTheme({
    mono: {
      formControl: {
        color: grey['400'],
        borderColor: grey['200'],
      },
    },
    blue: {
      formControl: {
        color: indigo['500'],
        borderColor: indigo['500'],
      },
    },
    red: {
      formControl: {
        color: pink['500'],
        borderColor: pink['500'],
      },
    },
    shared: {
      fontWeight: { bold: 'bold' },
      borderWidth: { thick: 4 },
      table: {
        headerBackgroundColor: grey['900'],
        borderColor: grey['400'],
        headerColor: CommonColors.white,
      },
    },
  } as Theme) as Theme;
};
