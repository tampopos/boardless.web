import * as React from 'react';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { Grid, createStyles } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/service-provider';

const styles = createStyles({
  root: {},
});
export interface ContainerProps {}
export const Container = decorate(styles)<ContainerProps & GridProps>(props => {
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = resolve('componentHelper').createPropagationProps(props);
  return <Grid {...pProps} className={root} container={true} />;
});
