import * as React from 'react';
import { Grid, createStyles } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';

const styles = createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: 10,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});
interface RowProps {}
export const Row = decorate(styles)<RowProps & GridProps>(props => {
  const { classes, ...others } = createPropagationProps(props);
  const { root } = classes;
  return <Grid {...others} className={root} item={true} xs={12 as 12} />;
});
