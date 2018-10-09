import * as React from 'react';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { Grid, createStyles } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';
import { decorate } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';

const styles = createStyles({
  root: {},
});
export interface ContainerProps {}
export const Container = decorate(styles)<ContainerProps & GridProps>(props => {
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = createPropagationProps(props);
  return <Grid {...pProps} className={root} container={true} />;
});
