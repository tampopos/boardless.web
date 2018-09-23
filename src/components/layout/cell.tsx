import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { GridProps } from '@material-ui/core/Grid';
import { Grid, createStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    display: 'flex',
  },
});
interface CellProps {}
type Props = WithStyleProps<typeof styles, CellProps & GridProps>;
export const Cell = withStyles(styles)((props: Props) => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props);
  return <Grid {...pProps} className={root} item={true} />;
});
