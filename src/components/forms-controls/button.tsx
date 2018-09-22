import { StylesBase, InjectableStyledProps } from 'src/common/styles/types';
import { Colors } from 'src/common/styles/theme';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { ComponentHelper } from 'src/common/component-helper';
import * as React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { ThemeColorScope } from 'src/common/styles/components/theme-color-scope';

interface Styles extends StylesBase {}
const styles = {
  root: {
    width: '100%',
  },
};
export interface ButtonProps extends InjectableStyledProps<Styles> {
  themeColor?: keyof Colors;
}
export const Button = decorate(styles)<ButtonProps & MuiButtonProps>(props => {
  const { themeColor } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = ComponentHelper.createPropagationProps(props, 'themeColor');
  return (
    <ThemeColorScope themeColor={themeColor}>
      <MuiButton
        {...pProps}
        className={root}
        variant="outlined"
        color={themeColor ? 'primary' : 'inherit'}
      />
    </ThemeColorScope>
  );
});
Button.defaultProps = { disabled: false };
