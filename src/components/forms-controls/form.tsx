import * as React from 'react';
import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { Theme } from '../../common/styles/theme';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { createPropagationProps } from '../../common/component-helper';
import { DivProps } from '../types';

interface Styles extends StylesBase {
  mono: any;
  blue: any;
  red: any;
}
const styles = (theme: Theme): Styles => ({
  root: {
    padding: [10, 20],
    borderWidth: theme.shared.borderWidth.thick,
    borderStyle: 'solid',
    borderRadius: 15,
  },
  mono: {
    color: theme.mono.form.color,
    borderColor: theme.mono.form.borderColor,
  },
  blue: {
    color: theme.blue.form.color,
    borderColor: theme.blue.form.borderColor,
  },
  red: {
    color: theme.red.form.color,
    borderColor: theme.red.form.borderColor,
  },
});
interface FormProps extends InjectableStyledProps<Styles> {
  themeType?: 'mono' | 'blue' | 'red';
}
export const Form = decorate(styles)<FormProps & DivProps>(props => {
  const { themeType } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = createPropagationProps(props);
  return (
    <div
      className={appendClassName(root, themeType ? classes[themeType] : '')}
      {...pProps}
    />
  );
});
Form.defaultProps = { themeType: 'mono' };
