import { Colors } from 'src/common/styles/theme';
import * as React from 'react';
import { Button as MuiButton, createStyles } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { ThemeColorScope } from '../styles/theme-color-scope';
import { WithStyleProps } from 'src/common/styles/types';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/service-provider';

const styles = createStyles({
  root: {
    width: '100%',
  },
});
export interface ButtonProps {
  themeColor?: keyof Colors;
}
type Props = WithStyleProps<typeof styles, ButtonProps & MuiButtonProps>;
export const Button = decorate(styles)((props: Props) => {
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
        color={themeColor ? 'primary' : 'inherit'}
      />
    </ThemeColorScope>
  );
});
Button.defaultProps = { disabled: false };
