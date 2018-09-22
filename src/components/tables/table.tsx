import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
  },
};
interface TableProps extends InjectableStyledProps<Styles> {}
export const Table = decorate(styles)<TableProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  return <div className={root} {...pProps} />;
});
Table.defaultProps = {};
