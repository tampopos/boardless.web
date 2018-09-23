import * as React from 'react';
import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import { Grid, createStyles } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import { decorate } from 'src/common/styles/styles-helper';

const styles = createStyles({
  root: {},
});
export interface ContainerProps {}
type Props = WithStyleProps<typeof styles, ContainerProps & GridProps>;
export const Container = decorate(styles)((props: Props) => {
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = ComponentHelper.createPropagationProps(props);
  return <Grid {...pProps} className={root} container={true} />;
});
