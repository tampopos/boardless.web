import { StylesBase, InjectableStyledProps, StyledProps } from './styles/types';
import { ObjectHelper } from './object-helper';

export namespace ComponentHelper {
  export const createPropagationProps = <
    TStyles extends StylesBase,
    TProps extends InjectableStyledProps<TStyles> & StyledProps<TStyles>
  >(
    props: TProps,
    ...excludes: Array<keyof TProps>
  ) => {
    return ObjectHelper.pickExclude(
      props,
      'theme',
      'classes',
      'className',
      'injectClasses',
      ...excludes,
    );
  };
}
