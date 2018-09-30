import {
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import * as React from 'react';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { Theme } from 'src/common/styles/theme';
import { resolve } from 'src/common/di/service-provider';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      borderCollapse: 'collapse',
      display: 'table-row',
      '&:nth-child(odd)': {
        backgroundColor: theme.shared.table.oddBackgroundColor,
      },
    },
    selectableRow: {
      '&:hover': {
        backgroundColor: theme.shared.table.hoverBackgroundColor,
      },
    },
    selectedRow: {
      '&$root$selectableRow': {
        backgroundColor: theme.shared.table.selectedBackgroundColor,
      },
    },
  });
interface TableRowProps {
  selectable?: boolean;
  selected?: boolean;
}
export const TableRow = decorate(styles)<TableRowProps & DivProps>(props => {
  const { selectable, selected } = props;
  const { root, selectableRow, selectedRow } = getInjectClasses(props);
  const pProps = resolve('componentHelper').createPropagationProps(
    props,
    'selectable',
    'selected',
  );
  const className = appendClassName(
    root,
    selectable ? selectableRow : '',
    selected ? selectedRow : '',
  );
  return <div className={className} {...pProps} />;
});
TableRow.defaultProps = { selectable: false, selected: false };
