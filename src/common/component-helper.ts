import { Styles, WithStyleProps } from './styles/types';
import { IObjectHelper } from './object-helper';

export interface IComponentHelper {
  createPropagationProps: <TStyles extends Styles, TProps = {}>(
    props: WithStyleProps<TStyles, TProps>,
    ...excludes: Array<keyof TProps>
  ) => {};
}
export class ComponentHelper implements IComponentHelper {
  constructor(private objectHelper: IObjectHelper) {}
  public createPropagationProps = <TStyles extends Styles, TProps = {}>(
    props: WithStyleProps<TStyles, TProps>,
    ...excludes: Array<keyof TProps>
  ) => {
    return this.objectHelper.pickExclude(
      props,
      'theme',
      'classes',
      'className',
      'injectClasses',
      ...excludes,
    );
  };
}
