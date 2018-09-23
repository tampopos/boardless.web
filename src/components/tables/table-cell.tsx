import { WithStyleProps } from '../../common/styles/types';
import {
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Theme, Colors, colors } from '../../common/styles/theme';
import { ObjectHelper } from 'src/common/object-helper';
import { createStyles, withStyles } from '@material-ui/core';

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
    ...ObjectHelper.mapObject(colors, color => ({
      color: color['500'],
    })),
  });
interface TableCellProps {
  isHeader?: boolean;
  themeColor?: keyof Colors;
}
type Props = WithStyleProps<typeof styles, TableCellProps & DivProps>;
export const TableCell = withStyles(styles)((props: Props) => {
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
