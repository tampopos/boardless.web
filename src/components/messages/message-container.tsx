import * as React from 'react';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { MessageBar } from './message-bar';
import { Theme } from 'src/common/styles/theme';
import { Message } from 'src/models/common/message';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from 'src/common/styles/styles-helper';
import { createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: theme.zIndex.snackbar,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 0,
      },
    },
    'root-vertical-top': { top: 0 },
    'root-vertical-center': { top: 0, bottom: 0 },
    'root-vertical-bottom': { bottom: 0 },
    'root-horizontal-left': { left: 0 },
    'root-horizontal-center': { left: 0, right: 0 },
    'root-horizontal-right': { right: 0 },
  });
export interface MessageContainerProps {
  clear?: () => void;
  close?: (id: string) => void;
  messages: Message[];
  anchorOrigin?: SnackbarOrigin;
}
export const MessageContainer = decorate(styles)<MessageContainerProps>(
  props => {
    const { clear, messages, close, anchorOrigin } = props;
    const classes = getInjectClasses(props);
    const { root } = classes;
    const classNames = [root];
    if (anchorOrigin) {
      classNames.push(classes['root-vertical-' + anchorOrigin.vertical]);
      classNames.push(classes['root-horizontal-' + anchorOrigin.horizontal]);
    }
    const className = appendClassName(...classNames);
    return (
      <div className={className}>
        {messages &&
          messages.map((m, i) => {
            return (
              <MessageBar
                key={m.id}
                anchorOrigin={anchorOrigin}
                message={m}
                clear={clear}
                close={() => {
                  if (close) {
                    close(m.id);
                  }
                }}
              />
            );
          })}
      </div>
    );
  },
);
MessageContainer.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};
