import * as React from 'react';
import { StyledSFC } from 'src/common/styles/types';
import { createStyles, Popover } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';
import { PopoverProps } from '@material-ui/core/Popover';

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
