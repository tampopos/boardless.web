import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Grid } from '@material-ui/core';
import { GridProps } from '@material-ui/core/Grid';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: {
    display: 'flex',
  },
};
interface RowProps extends InjectableStyledProps<Styles> {}
export const Row = decorate(styles)<RowProps & GridProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props);
  return <Grid {...pProps} className={root} item={true} xs={12} />;
});
