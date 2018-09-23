import { WithStyleProps } from '../../common/styles/types';
import {
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { createStyles, withStyles } from '@material-ui/core';

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
type Props = WithStyleProps<typeof styles, TableRowProps & DivProps>;
export const TableRow = withStyles(styles)((props: Props) => {
  const { selectable, selected } = props;
  const { root, selectableRow, selectedRow } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(
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
