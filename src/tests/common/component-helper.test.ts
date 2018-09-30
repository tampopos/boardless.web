import { ComponentHelper } from 'src/common/component-helper';
import { IObjectHelper } from 'src/common/interfaces/object-helper';
import { WithStyleProps } from 'src/common/styles/types';

class ObjectHelperMock implements IObjectHelper {
  public pick: <TProps>(
    props: TProps,
    filter: (key: keyof TProps) => boolean,
  ) => {};
  public pickInclude: <TProps>(
    props: TProps,
    ...includes: Array<keyof TProps>
  ) => {};
  public pickExclude: <TProps>(
    props: TProps,
    ...excludes: Array<keyof TProps>
  ) => {};
  public mapObject: <K extends string, T, U>(
    obj: Record<K, T>,
    func: (x: T) => U,
  ) => Record<K, U>;
}
it('ComponentHelper.createPropagationProps', () => {
  const objectHelperMock = new ObjectHelperMock();
  objectHelperMock.pickExclude = (p, e) => {
    return {};
  };
  const target = new ComponentHelper(objectHelperMock);
  const props: WithStyleProps<{}, {}> = {
    classes: {},
  };
  const actual = target.createPropagationProps(props);
  const expected = {};
  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});
