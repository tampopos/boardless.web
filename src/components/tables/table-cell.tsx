import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Theme, Colors, colors } from '../../common/styles/theme';
import { ObjectHelper } from 'src/common/object-helper';

interface Styles extends StylesBase, Record<keyof Colors, {}> {
  header: any;
}
const styles = (theme: Theme): Styles => ({
  root: {
    padding: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    display: 'table-cell',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderColor: theme.shared.table.borderColor,
  },
  header: {
    backgroundColor: theme.shared.table.headerBackgroundColor,
    color: theme.shared.table.headerColor,
    fontWeight: theme.shared.fontWeight.bold,
  },
  ...ObjectHelper.mapObject(colors, color => ({
    color: color['500'],
  })),
});
interface TableCellProps extends InjectableStyledProps<Styles> {
  isHeader?: boolean;
  themeColor?: keyof Colors;
}
export const TableCell = decorate(styles)<TableCellProps & DivProps>(props => {
  const { isHeader, themeColor } = props;
  const classes = getInjectClasses(props);
  const { root, header } = classes;
  const pProps = ComponentHelper.createPropagationProps(
    props,
    'isHeader',
    'themeColor',
  );
  return (
    <div
      className={appendClassName(
        root,
        isHeader ? header : themeColor ? classes[themeColor] : '',
      )}
      {...pProps}
    />
  );
});
TableCell.defaultProps = { isHeader: false };
