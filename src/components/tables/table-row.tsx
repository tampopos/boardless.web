import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { createPropagationProps } from '../../common/component-helper';
import * as React from 'react';

interface Styles extends StylesBase {
  selectableRow: any;
  selectedRow: any;
}
const styles: Styles = {
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
};
interface TableRowProps extends InjectableStyledProps<Styles> {
  selectable?: boolean;
  selected?: boolean;
}
export const TableRow = decorate(styles)<TableRowProps & DivProps>(props => {
  const { selectable, selected } = props;
  const { root, selectableRow, selectedRow } = getInjectClasses(props);
  const pProps = createPropagationProps(props, 'selectable', 'selected');
  const className = appendClassName(
    root,
    selectable ? selectableRow : '',
    selected ? selectedRow : '',
  );
  return <div className={className} {...pProps} />;
});
TableRow.defaultProps = { selectable: false, selected: false };
