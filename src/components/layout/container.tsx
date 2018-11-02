import * as React from 'react';
import { Grid, createStyles } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import { decorate } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';

const styles = createStyles({
  root: {},
});
export interface ContainerProps {}
export const Container = decorate(styles)<ContainerProps & GridProps>(props => {
  const { classes, injectClasses, ...others } = createPropagationProps(props);
  const { root } = classes;
  return <Grid {...others} className={root} container={true} />;
});
