import * as React from 'react';
import { createStyles, Popover } from '@material-ui/core';
import { PopoverProps } from '@material-ui/core/Popover';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createPropagationProps,
  decorate,
} from 'src/infrastructures/styles/styles-helper';

const styles = createStyles({
  root: {
    flexDirection: 'column',
    display: 'flex',
  },
});
interface Props {}
interface Events {}
const Inner: StyledSFC<
  typeof styles,
  Props & PopoverProps & Events
> = props => {
  const { anchorEl, classes, ...others } = createPropagationProps(props);
  const { root } = classes;
  const open = Boolean(anchorEl);
  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      {...others}
      classes={{ paper: root }}
    />
  );
};
export const ContextMenu = decorate(styles)(Inner);
