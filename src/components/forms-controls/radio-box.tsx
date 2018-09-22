import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { InputProps } from '../types';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {}
const styles: Styles = {
  root: {
    paddingLeft: 20,
    margin: 0,
  },
};
interface RadioBoxProps extends InjectableStyledProps<Styles> {}
export const RadioBox = decorate(styles)<RadioBoxProps & InputProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props, 'type');
  return <input className={root} {...pProps} type="radio" />;
});
RadioBox.defaultProps = {};
