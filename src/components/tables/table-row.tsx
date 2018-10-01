import {
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import * as React from 'react';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/di/service-provider';

const styles = createStyles({
  root: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table-row',
    '&:nth-child(odd)': {
      backgroundColor: '#f6f6f6',
    },
  },
  selectableRow: {
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  selectedRow: {
    '&$root$selectableRow': {
      backgroundColor: '#ddd',
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
