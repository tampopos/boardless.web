import {
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import * as React from 'react';
import { Theme, Colors, colors } from '../../common/styles/theme';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/service-provider';

const styles = (theme: Theme) =>
  createStyles({
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
    ...resolve('objectHelper').mapObject(colors, color => ({
      color: theme.palette.type === 'light' ? color['600'] : color['400'],
    })),
  });
interface TableCellProps {
  isHeader?: boolean;
  themeColor?: keyof Colors;
}
export const TableCell = decorate(styles)<TableCellProps & DivProps>(props => {
  const { isHeader, themeColor } = props;
  const classes = getInjectClasses(props);
  const { root, header } = classes;
  const pProps = resolve('componentHelper').createPropagationProps(
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
