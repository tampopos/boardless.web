import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { createPropagationProps } from 'src/common/component-helper';
import { FormProps } from '../types';

const styles = createStyles({
  root: {},
});
export interface Props {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form = decorate(styles)<Props & FormProps>(props => {
  const { onSubmit } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = createPropagationProps(props, 'onSubmit');
  const onSubmitInner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
    return false;
  };
  return (
    <form
      {...pProps}
      className={root}
      onSubmit={onSubmitInner}
      noValidate={true}
    />
  );
});
