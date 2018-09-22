import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { GridProps } from '@material-ui/core/Grid';
import { Grid } from '@material-ui/core';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: {
    display: 'flex',
  },
};
interface CellProps extends InjectableStyledProps<Styles> {}
export const Cell = decorate(styles)<CellProps & GridProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props);
  return <Grid {...pProps} className={root} item={true} />;
});
