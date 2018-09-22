import { decorate } from 'src/common/styles/styles-helper';
import * as React from 'react';

interface Styles {
  '@global': {};
}
const styles: Styles = {
  '@global': {
    body: {
      fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
    a: {
      textDecoration: 'underline',
    },
  },
};
export const GlobalStyle = decorate(styles)(({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
});
