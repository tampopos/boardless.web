import { ObjectHelper } from '../../common/object-helper';

const objectHelper = new ObjectHelper();
it('ObjectHelper.pick', () => {
  const actual = objectHelper.pick(
    { p1: 'p1', p2: 'p2', p3: 'p3' },
    x => x !== 'p1',
  ) as { p2: string };
  const expected = { p2: 'p2', p3: 'p3' };
  expect(JSON.stringify(actual) === JSON.stringify(expected));
  expect(actual.p2 === expected.p2);
});
