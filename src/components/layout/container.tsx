import * as React from 'react';
import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import { Grid } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: {},
};
export interface ContainerProps extends InjectableStyledProps<Styles> {}
export const Container = decorate(styles)<ContainerProps & GridProps>(props => {
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = ComponentHelper.createPropagationProps(props);
  return <Grid {...pProps} className={root} container={true} />;
});
