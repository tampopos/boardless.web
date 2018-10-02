import { getInjectClasses } from '../../common/styles/styles-helper';
import * as React from 'react';
import { GridProps } from '@material-ui/core/Grid';
import { Grid, createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';

const styles = createStyles({
  root: {
    display: 'flex',
  },
});
interface CellProps {}
export const Cell = decorate(styles)<CellProps & GridProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  return <Grid {...pProps} className={root} item={true} />;
});
