import { Styles, WithStyleProps } from './styles/types';
import { pickExclude } from './object-helper';

export const createPropagationProps = <TStyles extends Styles, TProps = {}>(
  props: WithStyleProps<TStyles, TProps>,
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
