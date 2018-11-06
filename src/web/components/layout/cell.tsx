import * as React from 'react';
import { GridProps } from '@material-ui/core/Grid';
import { Grid, createStyles } from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';

const styles = createStyles({
  root: {
    display: 'flex',
  },
});
interface CellProps {}
export const Cell = decorate(styles)<CellProps & GridProps>(props => {
  const { classes, ...others } = createPropagationProps(props);
  const { root } = classes;
  return <Grid {...others} className={root} item={true} />;
});
