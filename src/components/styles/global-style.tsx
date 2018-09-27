import * as React from 'react';
import { decorate } from 'src/common/styles/styles-helper';
import { createStyles } from '@material-ui/core';

const styles = createStyles({
  '@global': {
    body: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    },
    a: {
      textDecoration: 'underline',
    },
  },
});
export const GlobalStyle = decorate(styles)(({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
});
