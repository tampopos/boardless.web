import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { WithStyleProps } from 'src/common/styles/types';

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
type Props = WithStyleProps<typeof styles>;
export const GlobalStyle = withStyles(styles)(({ children }: Props) => {
  return <React.Fragment>{children}</React.Fragment>;
});
