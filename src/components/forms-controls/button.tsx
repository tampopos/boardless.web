import { Colors } from 'src/common/styles/theme';
import * as React from 'react';
import { Button as MuiButton, createStyles } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { ThemeColorScope } from '../styles/theme-color-scope';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/di/service-provider';

const styles = createStyles({
  root: {
    width: '100%',
  },
});
export interface ButtonProps {
  themeColor?: keyof Colors;
}
export const Button = decorate(styles)<ButtonProps & MuiButtonProps>(props => {
  const { themeColor, classes } = props;
  const { root } = classes;
  const pProps = resolve('componentHelper').createPropagationProps(
    props,
    'themeColor',
  );
  return (
    <ThemeColorScope themeColor={themeColor}>
      <MuiButton
        {...pProps}
        className={root}
        variant="outlined"
        color={themeColor ? 'primary' : 'default'}
      />
    </ThemeColorScope>
  );
});
Button.defaultProps = { disabled: false };
