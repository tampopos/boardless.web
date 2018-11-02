import { appendClassName } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import * as React from 'react';
import { Theme, Colors, colors } from '../../common/styles/theme';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { mapObject } from 'src/common/object-helper';
import { createPropagationProps } from 'src/common/component-helper';

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
    ...mapObject(colors, color => ({
      color: theme.palette.type === 'light' ? color['600'] : color['400'],
    })),
  });
interface TableCellProps {
  isHeader?: boolean;
  themeColor?: keyof Colors;
}
export const TableCell = decorate(styles)<TableCellProps & DivProps>(props => {
  const { isHeader, themeColor, classes, ...others } = createPropagationProps(
    props,
  );
  const { root, header } = classes;
  return (
    <div
      className={appendClassName(
        root,
        isHeader ? header : themeColor ? classes[themeColor] : '',
      )}
      {...others}
    />
  );
});
TableCell.defaultProps = { isHeader: false };
