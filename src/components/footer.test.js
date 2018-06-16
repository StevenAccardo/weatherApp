import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../tests/testUtils';
import Footer from './footer';

test('renders without error', () => {
  const wrapper = shallow(<Footer />);
  const component = findByTestAttr(wrapper, 'component-footer');
  expect(component.length).toBe(1);
});
