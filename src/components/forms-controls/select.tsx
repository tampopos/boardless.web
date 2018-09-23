import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Colors } from '../../common/styles/theme';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  createStyles,
  withStyles,
} from '@material-ui/core';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import { ThemeColorScope } from '../styles/theme-color-scope';

const styles = createStyles({
  root: {
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
  },
  select: {},
});
interface SelectProps {
  items: MenuItemProps[];
  themeColor?: keyof Colors;
  label: string;
}
type Props = WithStyleProps<typeof styles, SelectProps & MuiSelectProps>;
export const Select = withStyles(styles)((props: Props) => {
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
