import {
  createStyles,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@material-ui/core';
import { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { Colors } from 'src/infrastructures/styles/theme';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { ThemeColorScope } from '../styles/theme-color-scope';
import * as React from 'react';

const styles = createStyles({
  root: {},
  checkbox: {},
});
interface CheckboxProps {
  themeColor?: keyof Colors;
  label?: string;
}
export const Checkbox = decorate(styles)<CheckboxProps & MuiCheckboxProps>(
  props => {
    const { themeColor, label, classes, ...others } = createPropagationProps(
      props,
    );
    const { root, checkbox } = classes;
    const color = themeColor ? 'primary' : 'default';
    return (
      <ThemeColorScope themeColor={themeColor}>
        <FormControlLabel
          className={root}
          control={
            <MuiCheckbox {...others} className={checkbox} color={color} />
          }
          label={label}
        />
      </ThemeColorScope>
    );
  },
);
