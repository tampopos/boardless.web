import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Grid, createStyles, withStyles } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';

const styles = createStyles({
  root: {
    display: 'flex',
  },
});
interface RowProps {}
type Props = WithStyleProps<typeof styles, RowProps & GridProps>;
export const Row = withStyles(styles)((props: Props) => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props);
  return <Grid {...pProps} className={root} item={true} xs={12} />;
});
