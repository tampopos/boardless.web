export const palette = {
  white: {
    bright: '#fff',
    dark: '#ccc',
  },
  gray: {
    bright: '#888',
    middle: '#555',
    dark: '#333',
  },
  blue: {
    middle: '#55b',
  },
  red: {
    middle: '#b55',
  },
  shadow: {
    gray: '1px 1px 2px #888',
    blue: '1px 1px 2px #88b',
    red: '1px 1px 2px #b88',
    none: 'none',
  },
};
interface Parameter {
  button: {
    backgroundColor: string;
    boxShadow: string;
    color: string;
    disabled: {
      backgroundColor: string;
      boxShadow: string;
    };
    active: {
      boxShadow: string;
    };
  };
  form: {
    color: string;
    borderColor: string;
  };
  formControl: {
    color: string;
    borderColor: string;
  };
  table: {
    color: string;
    headerBackgroundColor: string;
    headerColor: string;
  };
}
export interface Theme {
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
  };
}
export const createTheme = () => {
  const { white, gray, blue, red, shadow } = palette;
  return {
    mono: {
      button: {
        backgroundColor: gray.dark,
        boxShadow: shadow.gray,
        color: palette.white.bright,
        disabled: {
          backgroundColor: gray.bright,
          boxShadow: shadow.none,
        },
        active: {
          boxShadow: shadow.none,
        },
      },
      form: {
        color: gray.middle,
        borderColor: gray.middle,
      },
      formControl: {
        color: gray.middle,
        borderColor: gray.bright,
      },
      table: {
        headerBackgroundColor: gray.dark,
        color: white.dark,
        headerColor: white.bright,
      },
    },
    blue: {
      button: {
        backgroundColor: blue.middle,
        boxShadow: shadow.blue,
        color: palette.white.bright,
        disabled: {
          backgroundColor: gray.bright,
          boxShadow: shadow.none,
        },
        active: {
          boxShadow: shadow.none,
        },
      },
      form: {
        color: gray.middle,
        borderColor: blue.middle,
      },
      formControl: {
        color: blue.middle,
        borderColor: blue.middle,
      },
      table: {
        color: blue.middle,
      },
    },
    red: {
      button: {
        backgroundColor: red.middle,
        boxShadow: shadow.red,
        color: palette.white.bright,
        disabled: {
          backgroundColor: gray.bright,
          boxShadow: shadow.none,
        },
        active: {
          boxShadow: shadow.none,
        },
      },
      form: {
        color: gray.middle,
        borderColor: red.middle,
      },
      formControl: {
        color: red.middle,
        borderColor: red.middle,
      },
      table: {
        color: red.middle,
      },
    },
    shared: {
      fontWeight: { bold: 'bold' },
      borderWidth: { thick: 4 },
    },
  } as Theme;
};
