import {
  createStyles,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@material-ui/core';
import { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { Colors } from 'src/common/styles/theme';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';
import { ThemeColorScope } from '../styles/theme-color-scope';
import * as React from 'react';

const styles = createStyles({
  root: {
    marginRight: 10,
  },
  checkbox: {
    marginLeft: 10,
  },
});
interface CheckboxProps {
  themeColor?: keyof Colors;
  label?: string;
}
export const Checkbox = decorate(styles)<CheckboxProps & MuiCheckboxProps>(
  props => {
    const { themeColor, label } = props;
    const classes = getInjectClasses(props);
    const { root, checkbox } = classes;
    const pProps = createPropagationProps(props, 'themeColor', 'label');
    const color = themeColor ? 'primary' : 'default';
    return (
      <ThemeColorScope themeColor={themeColor}>
        <FormControlLabel
          className={root}
          control={
            <MuiCheckbox {...pProps} className={checkbox} color={color} />
          }
          label={label}
        />
      </ThemeColorScope>
    );
  },
);
