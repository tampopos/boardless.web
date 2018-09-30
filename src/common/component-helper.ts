import { Styles, WithStyleProps } from './styles/types';
import { injectable, inject } from 'inversify';
import { IObjectHelper } from './interfaces/object-helper';
import { IComponentHelper } from './interfaces/component-helper';

@injectable()
export class ComponentHelper implements IComponentHelper {
  constructor(@inject('objectHelper') private objectHelper: IObjectHelper) {}
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
