import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { createStyles } from '@material-ui/core';
import { resolve } from 'src/common/service-provider';
import * as React from 'react';

const styles = createStyles({
  root: {},
});
export interface FormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form = decorate(styles)<FormProps>(props => {
  const { onSubmit } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = resolve('componentHelper').createPropagationProps(
    props,
    'onSubmit',
  );
  const onSubmitInner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
    return false;
  };
  return <form {...pProps} className={root} onSubmit={onSubmitInner} />;
});
