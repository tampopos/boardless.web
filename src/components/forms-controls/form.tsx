import { decorate } from 'src/common/styles/styles-helper';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { createPropagationProps } from 'src/common/component-helper';
import { FormProps } from '../types';

const styles = createStyles({
  root: {
    width: '100%',
  },
});
export interface Props {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form = decorate(styles)<Props & FormProps>(props => {
  const { onSubmit, classes, ...others } = createPropagationProps(props);
  const { root } = classes;
  const onSubmitInner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
    return false;
  };
  return (
    <form
      {...others}
      className={root}
      onSubmit={onSubmitInner}
      noValidate={true}
    />
  );
});
