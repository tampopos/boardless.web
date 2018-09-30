import * as React from 'react';
import { decorate } from 'src/common/styles/styles-helper';
import { createStyles } from '@material-ui/core';

const styles = createStyles({
  '@global': {
    html: {
      height: '100%',
    },
    body: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      height: '100%',
    },
    '#root': {
      position: 'relative',
      display: 'flex',
      width: '100%',
      overflow: 'hidden',
      height: '100%',
    },
    a: {
      textDecoration: 'underline',
    },
  },
});
export const GlobalStyle = decorate(styles)(({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
});
