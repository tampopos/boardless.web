import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: (props: RowProps) => {
    const s = {
      display: 'flex',
      padding: 3,
      alignItems: 'center',
    };
    if (props.right) {
      return Object.assign(s, { justifyContent: 'flex-end' });
    }
    return s;
  },
};
interface RowProps extends InjectableStyledProps<Styles> {
  right?: boolean;
}
export const Row = decorate(styles)<RowProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props, 'right');
  return <div className={root} {...pProps} />;
});
Row.defaultProps = { right: false };
