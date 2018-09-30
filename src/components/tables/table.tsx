import { getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import * as React from 'react';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/di/service-provider';

const styles = createStyles({
  root: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
  },
});
interface TableProps {}
export const Table = decorate(styles)<TableProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = resolve('componentHelper').createPropagationProps(props);
  return <div className={root} {...pProps} />;
});
Table.defaultProps = {};
