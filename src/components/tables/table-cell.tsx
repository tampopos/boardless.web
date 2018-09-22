import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';
import { Theme } from '../../common/styles/theme';

interface Styles extends StylesBase {
  header: any;
  mono: any;
  blue: any;
  red: any;
}
const styles = (theme: Theme): Styles => ({
  root: {
    padding: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    display: 'table-cell',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  header: {
    backgroundColor: theme.mono.table.headerBackgroundColor,
    color: theme.mono.table.headerColor,
    fontWeight: theme.shared.fontWeight.bold,
    borderColor: theme.mono.table.color,
  },
  mono: {
    color: theme.mono.table.color,
    borderColor: theme.mono.table.color,
  },
  blue: {
    color: theme.blue.table.color,
    borderColor: theme.mono.table.color,
  },
  red: {
    color: theme.red.table.color,
    borderColor: theme.mono.table.color,
  },
});
interface TableCellProps extends InjectableStyledProps<Styles> {
  isHeader?: boolean;
  themeType?: 'mono' | 'blue' | 'red';
}
export const TableCell = decorate(styles)<TableCellProps & DivProps>(props => {
  const { isHeader, themeType } = props;
  const classes = getInjectClasses(props);
  const { root, header } = classes;
  const pProps = createPropagationProps(props, 'isHeader', 'themeType');
  return (
    <div
      className={appendClassName(
        root,
        isHeader ? header : themeType ? classes[themeType] : '',
      )}
      {...pProps}
    />
  );
});
TableCell.defaultProps = { isHeader: false, themeType: 'mono' };
