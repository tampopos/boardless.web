import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import * as React from 'react';
import { Grid, createStyles } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/service-provider';

const styles = createStyles({
  root: {
    display: 'flex',
  },
});
interface RowProps {}
type Props = WithStyleProps<typeof styles, RowProps & GridProps>;
export const Row = decorate(styles)((props: Props) => {
  const { root } = getInjectClasses(props);
  const pProps = resolve('componentHelper').createPropagationProps(props);
  return <Grid {...pProps} className={root} item={true} xs={12 as 12} />;
});
