import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: (props: CellProps) => {
    const size = (100 * (props.size ? props.size : 2)) / 12;
    return {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: `${size}%`,
    };
  },
};
interface CellProps extends InjectableStyledProps<Styles> {
  size?: number;
}
export const Cell = decorate(styles)<CellProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props, 'size');
  return <div className={root} {...pProps} />;
});
Cell.defaultProps = { size: 4 };
