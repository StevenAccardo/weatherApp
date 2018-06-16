import React from 'react';
import SearchBar from './searchBar';
import { shallow } from 'enzyme';

describe('SearchBar component', () => {
  it('starts with an empty searchValue', () => {
    const wrapper = shallow(<SearchBar />);
    const searchValueState = wrapper.state().searchValue;
    expect(searchValueState).toEqual('');
  });
});
