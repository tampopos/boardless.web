import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { GridProps } from '@material-ui/core/Grid';
import { Grid, createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';

const styles = createStyles({
  root: {
    display: 'flex',
  },
});
interface CellProps {}
type Props = WithStyleProps<typeof styles, CellProps & GridProps>;
export const Cell = decorate(styles)((props: Props) => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props);
  return <Grid {...pProps} className={root} item={true} />;
});
