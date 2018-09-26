import * as React from 'react';
import * as enzyme from 'enzyme';
import { Button } from 'src/components/forms-controls/button';

it('Button.text', () => {
  const button = enzyme.shallow(<Button>test</Button>);
  const actual = button.props().children;
  expect(actual).toEqual('test');
});
