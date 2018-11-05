import { mapObject } from 'src/infrastructures/common/object-helper';

it('ObjectHelper.mapObject', () => {
  type keys = 'p1' | 'p2';
  const test: Record<keys, number> = { p1: 1, p2: 2 };
  const actual = mapObject(test, x => (x + 1).toString());
  const expected = { p1: '2', p2: '3' };
  expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
});
