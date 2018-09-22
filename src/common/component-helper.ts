import { StylesBase, InjectableStyledProps, StyledProps } from './styles/types';
import { pickExclude } from './object-helper';

export const createPropagationProps = <
  TStyles extends StylesBase,
  TProps extends InjectableStyledProps<TStyles> & StyledProps<TStyles>
>(
  props: TProps,
  ...excludes: Array<keyof TProps>
) => {
  return pickExclude(
    props,
    'theme',
    'classes',
    'className',
    'injectClasses',
    ...excludes,
  );
};
