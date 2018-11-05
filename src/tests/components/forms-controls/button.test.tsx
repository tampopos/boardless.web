import * as React from 'react';
import * as enzyme from 'enzyme';
import { OutlinedButton } from 'src/web/components/forms-controls/button';

it('Button.text', () => {
  const button = enzyme.shallow(<OutlinedButton>test</OutlinedButton>);
  const actual = button.props().children;
  expect(actual).toEqual('test');
});
