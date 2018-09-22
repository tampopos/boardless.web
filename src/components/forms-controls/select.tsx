import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Theme, Colors } from '../../common/styles/theme';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
} from '@material-ui/core';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import { ThemeColorScope } from 'src/common/styles/components/theme-color-scope';

interface Styles extends StylesBase {
  select: {};
}
const styles = (theme: Theme): Styles => ({
  root: {
    width: '100%',
    margin: [0, 10],
  },
  select: {},
});
interface SelectProps extends InjectableStyledProps<Styles> {
  items: MenuItemProps[];
  themeColor?: keyof Colors;
  label: string;
}
export const Select = decorate(styles)<SelectProps & MuiSelectProps>(props => {
  const { items, themeColor, label } = props;
  const classes = getInjectClasses(props);
  const { root, select } = classes;
  const pProps = ComponentHelper.createPropagationProps(
    props,
    'items',
    'themeColor',
    'label',
  );
  return (
    <ThemeColorScope themeColor={themeColor}>
      <FormControl className={root}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect
          {...pProps}
          className={select}
          color={themeColor ? 'primary' : 'inherit'}
        >
          {items.map(x => (
            <MenuItem {...x} />
          ))}
        </MuiSelect>
      </FormControl>
    </ThemeColorScope>
  );
});
