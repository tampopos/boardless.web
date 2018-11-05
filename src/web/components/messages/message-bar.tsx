import * as React from 'react';
import { MessageField } from './message-field';
import { createStyles, Snackbar, IconButton } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Theme } from 'src/infrastructures/styles/theme';
import { Message } from 'src/domains/models/common/message';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { Close } from '@material-ui/icons';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { delay } from 'src/infrastructures/common/async-helper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        marginBottom: 5,
      },
    },
    content: {
      color: theme.palette.text.primary,
      background: theme.palette.background.paper,
      display: 'flex',
      flexWrap: 'nowrap',
    },
    contentMessage: {
      overflow: 'hidden',
    },
    contentAction: { paddingLeft: 0 },
    contentButton: {
      height: 'inherit',
    },
    closeIcon: {
      fontSize: theme.typography.title.fontSize,
    },
  });
export interface MessageBarProps {
  clear?: () => void;
  close?: () => void;
  message: Message;
  anchorOrigin?: SnackbarOrigin;
}
export const MessageBar = decorate(styles)<MessageBarProps>(props => {
  const { close, message, anchorOrigin, classes } = createPropagationProps(
    props,
  );
  const { showDuration } = message;
  const {
    root,
    content,
    contentMessage,
    contentAction,
    contentButton,
    closeIcon,
  } = classes;
  if (showDuration && close) {
    delay(showDuration).then(close);
  }
  return (
    <Snackbar
      className={root}
      ContentProps={{
        className: content,
        classes: {
          message: contentMessage,
          action: contentAction,
        },
      }}
      anchorOrigin={anchorOrigin}
      open={true}
      onClose={(event, reason) => {
        if (reason !== 'clickaway' && close) {
          close();
        }
      }}
      message={<MessageField message={message} />}
      action={[
        <IconButton
          key="close"
          color="inherit"
          disableRipple={true}
          className={contentButton}
          onClick={close}
        >
          <Close className={closeIcon} />
        </IconButton>,
      ]}
    />
  );
});
