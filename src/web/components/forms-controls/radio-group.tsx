import * as React from 'react';
import {
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
  createStyles,
} from '@material-ui/core';
import { RadioGroupProps as MuiRadioGroupProps } from '@material-ui/core/RadioGroup';
import { ThemeColorScope } from '../styles/theme-color-scope';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { Colors } from 'src/infrastructures/styles/theme';

const styles = createStyles({
  root: {
    width: '100%',
  },
  group: { flexDirection: 'row' },
});
interface RadioGroupProps {
  themeColor?: keyof Colors;
  label?: string;
  items?: Array<Partial<FormControlLabelProps>>;
  readOnly?: boolean;
}
export const RadioGroup = decorate(styles)<
  RadioGroupProps & MuiRadioGroupProps
>(props => {
  const {
    themeColor,
    label,
    items,
    readOnly,
    classes,
    ...others
  } = createPropagationProps(props);
  const { root, group } = classes;
  const color = themeColor ? 'primary' : 'default';
  const radioColor = themeColor ? 'primary' : 'default';
  return (
    <ThemeColorScope themeColor={themeColor}>
      <FormControl className={root}>
        <FormLabel>{label}</FormLabel>
        <MuiRadioGroup {...others} className={group} color={color}>
          {items &&
            items.map(x => (
              <FormControlLabel
                key={x.value}
                label=""
                {...x}
                control={<Radio disabled={readOnly} color={radioColor} />}
              />
            ))}
        </MuiRadioGroup>
      </FormControl>
    </ThemeColorScope>
  );
});
