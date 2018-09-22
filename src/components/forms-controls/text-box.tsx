import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Colors } from '../../common/styles/theme';
import { TextField, Theme } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { ThemeColorScope } from 'src/common/styles/components/theme-color-scope';

interface Styles extends StylesBase {}
const styles = (theme: Theme): Styles => ({
  root: {
    width: '100%',
    margin: [0, 10],
  },
});
interface TextBoxProps extends InjectableStyledProps<Styles> {
  maxLength?: number;
  themeColor?: keyof Colors;
}
export const TextBox = decorate(styles)<TextBoxProps & TextFieldProps>(
  props => {
    const { themeColor, onChange, maxLength } = props;
    const classes = getInjectClasses(props);
    const { root } = classes;
    const pProps = ComponentHelper.createPropagationProps(
      props,
      'themeColor',
      'maxLength',
    );
    return (
      <ThemeColorScope themeColor={themeColor}>
        <TextField
          {...pProps}
          className={root}
          onChange={e =>
            onChange
              ? maxLength
                ? e.target.value.length <= maxLength && onChange(e)
                : onChange(e)
              : null
          }
          color={themeColor ? 'primary' : 'inherit'}
        />
      </ThemeColorScope>
    );
  },
);
TextBox.defaultProps = { type: 'text' };
