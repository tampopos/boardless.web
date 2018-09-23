import { Styles, WithStyleProps } from './styles/types';
import { ObjectHelper } from './object-helper';

export namespace ComponentHelper {
  export const createPropagationProps = <TStyles extends Styles, TProps = {}>(
    props: WithStyleProps<TStyles, TProps>,
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
