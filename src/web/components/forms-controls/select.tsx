import * as React from 'react';
import { Colors } from 'src/infrastructures/styles/theme';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  createStyles,
} from '@material-ui/core';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import { ThemeColorScope } from '../styles/theme-color-scope';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';

const styles = createStyles({
  root: {
    width: '100%',
  },
  select: {},
});
interface SelectProps {
  items: MenuItemProps[];
  themeColor?: keyof Colors;
  label: string;
}
export const Select = decorate(styles)<SelectProps & MuiSelectProps>(props => {
  const {
    items,
    themeColor,
    label,
    classes,
    ...others
  } = createPropagationProps(props);
  const { root, select } = classes;
  return (
    <ThemeColorScope themeColor={themeColor}>
      <FormControl className={root}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          {...others}
          className={select}
          color={themeColor ? 'primary' : 'default'}
        >
          {items.map(x => (
            <MenuItem {...x} />
          ))}
        </MuiSelect>
      </FormControl>
    </ThemeColorScope>
  );
});
