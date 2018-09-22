import { Theme } from '../../common/styles/theme';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import * as React from 'react';
import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { createPropagationProps } from '../../common/component-helper';
import { BaseButtonProps } from '../types';

interface Styles extends StylesBase {
  mono: any;
  blue: any;
  red: any;
}
const styles = (theme: Theme): Styles => ({
  root: {
    width: '100%',
    position: 'relative',
    border: 'none',
    height: 30,
    outline: 'none',
    fontWeight: theme.shared.fontWeight.bold,
    borderRadius: 4,
    '&:active': {
      top: 1,
      left: 1,
    },
  },
  mono: {
    backgroundColor: theme.mono.button.backgroundColor,
    boxShadow: theme.mono.button.boxShadow,
    color: theme.mono.button.color,
    '&[disabled]': {
      backgroundColor: theme.mono.button.disabled.backgroundColor,
      boxShadow: theme.mono.button.disabled.boxShadow,
    },
    '&:active': {
      boxShadow: theme.mono.button.active.boxShadow,
    },
  },
  blue: {
    backgroundColor: theme.blue.button.backgroundColor,
    boxShadow: theme.blue.button.boxShadow,
    color: theme.blue.button.color,
    '&[disabled]': {
      backgroundColor: theme.blue.button.disabled.backgroundColor,
      boxShadow: theme.blue.button.disabled.boxShadow,
    },
    '&:active': {
      boxShadow: theme.blue.button.active.boxShadow,
    },
  },
  red: {
    backgroundColor: theme.red.button.backgroundColor,
    boxShadow: theme.red.button.boxShadow,
    color: theme.red.button.color,
    '&[disabled]': {
      backgroundColor: theme.red.button.disabled.backgroundColor,
      boxShadow: theme.red.button.disabled.boxShadow,
    },
    '&:active': {
      boxShadow: theme.red.button.active.boxShadow,
    },
  },
});
interface ButtonProps extends InjectableStyledProps<Styles> {
  themeType?: 'mono' | 'blue' | 'red';
}
export const Button = decorate(styles)<ButtonProps & BaseButtonProps>(props => {
  const { themeType } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = createPropagationProps(props, 'themeType');
  return (
    <button
      className={appendClassName(root, themeType ? classes[themeType] : '')}
      {...pProps}
    />
  );
});
Button.defaultProps = { disabled: false, themeType: 'mono' };
