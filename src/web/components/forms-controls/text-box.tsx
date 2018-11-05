import * as React from 'react';
import { Colors } from 'src/infrastructures/styles/theme';
import { TextField, createStyles } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { ThemeColorScope } from '../styles/theme-color-scope';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';

const styles = createStyles({
  root: {
    width: '100%',
  },
});
interface Props {
  maxLength?: number;
  themeColor?: keyof Colors;
}
export type TextBoxProps = Props & TextFieldProps;
export const TextBox = decorate(styles)<TextBoxProps>(props => {
  const {
    themeColor,
    onChange,
    maxLength,
    classes,
    variant,
    ...others
  } = createPropagationProps(props);
  const { root } = classes;
  return (
    <ThemeColorScope themeColor={themeColor}>
      <TextField
        variant="standard"
        {...others}
        className={root}
        onChange={e =>
          onChange
            ? maxLength
              ? e.target.value.length <= maxLength && onChange(e)
              : onChange(e)
            : null
        }
        color={themeColor ? 'primary' : 'default'}
      />
    </ThemeColorScope>
  );
});
TextBox.defaultProps = { type: 'text', variant: 'standard' };
export const OutlinedTextBox: React.SFC<
  TextBoxProps & TextFieldProps
> = props => <TextBox {...props} variant="outlined" />;
