import { Colors } from 'src/common/styles/theme';
import * as React from 'react';
import { Button as MuiButton, createStyles } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { ThemeColorScope } from '../styles/theme-color-scope';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';

const styles = createStyles({
  root: {
    width: '100%',
    marginRight: 10,
  },
});
export interface ButtonProps {
  themeColor?: keyof Colors;
}
export const Button = decorate(styles)<ButtonProps & MuiButtonProps>(props => {
  const { themeColor } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = createPropagationProps(props, 'themeColor');
  return (
    <ThemeColorScope themeColor={themeColor}>
      <MuiButton
        {...pProps}
        className={root}
        color={themeColor ? 'primary' : 'default'}
      />
    </ThemeColorScope>
  );
});
Button.defaultProps = { disabled: false };
export const OutlinedButton: React.SFC<
  ButtonProps & MuiButtonProps
> = props => <Button {...props} variant="outlined" />;
