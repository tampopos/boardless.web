import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { InputProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';
import { Theme } from '../../common/styles/theme';

interface Styles extends StylesBase {
  mono: any;
  blue: any;
  red: any;
}
const styles = (theme: Theme): Styles => ({
  root: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    fontWeight: 'bold',
    outline: 'none',
    width: '100%',
  },
  mono: {
    borderColor: theme.mono.formControl.borderColor,
    color: theme.mono.formControl.color,
  },
  blue: {
    borderColor: theme.blue.formControl.borderColor,
    color: theme.blue.formControl.color,
  },
  red: {
    borderColor: theme.red.formControl.borderColor,
    color: theme.red.formControl.color,
  },
});
interface TextBoxProps extends InjectableStyledProps<Styles> {
  themeType?: 'mono' | 'blue' | 'red';
}
export const TextBox = decorate(styles)<TextBoxProps & InputProps>(props => {
  const { themeType } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = createPropagationProps(props, 'themeType');
  return (
    <input
      className={appendClassName(root, themeType ? classes[themeType] : '')}
      {...pProps}
    />
  );
});
TextBox.defaultProps = { type: 'text', themeType: 'mono' };
