import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import { SearchBar as UnconnectedSearchBar } from './searchBar';

describe('SearchBar component', () => {
  describe('render', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<UnconnectedSearchBar />);
    });
    /////////////////////
    test('SearchBar renders without error', () => {
      const component = findByTestAttr(wrapper, 'component-searchbar');
      expect(component.length).toBe(1);
    });
    /////////////////////
    test('SearchBar input renders without error', () => {
      const component = findByTestAttr(wrapper, 'search-input');
      expect(component.length).toBe(1);
    });
    /////////////////////
    test('Imperial searchBar__radio input renders without error', () => {
      const component = findByTestAttr(wrapper, 'imperial-radio-input');
      expect(component.length).toBe(1);
    });
    /////////////////////
    test('Metric searchBar__radio input renders without error', () => {
      const component = findByTestAttr(wrapper, 'metric-radio-input');
      expect(component.length).toBe(1);
    });
  });

  describe('No input', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<UnconnectedSearchBar />);
    });
    /////////////////////
    test('starts with an empty searchValue state', () => {
      const searchValueState = wrapper.state().searchValue;
      expect(searchValueState).toEqual('');
    });
    /////////////////////
    test('units changes to "metric" when metric radio button is clicked', () => {
      const metricButton = findByTestAttr(wrapper, 'metric-radio-input');
      metricButton.simulate('change', { target: { value: 'metric' } });
      const unitsState = wrapper.state().units;
      expect(unitsState).toEqual('metric');
    });
    /////////////////////
    test('units changes to "imperial" when imperial radio button is clicked', () => {
      const metricButton = findByTestAttr(wrapper, 'metric-radio-input');
      const imperialButton = findByTestAttr(wrapper, 'imperial-radio-input');
      metricButton.simulate('change', { target: { value: 'metric' } });
      imperialButton.simulate('change', { target: { value: 'imperial' } });
      const unitsState = wrapper.state().units;
      expect(unitsState).toEqual('imperial');
    });
  });
  /////////////////////
  describe('With an input', () => {
    test('action creator called when user presses enter key', () => {
      const fetchWeatherMock = jest.fn();
      const wrapper = shallow(<UnconnectedSearchBar fetchWeather={fetchWeatherMock} />);
      const keyCode = 13;
      wrapper.setState({ searchValue: 'test' });
      const input = findByTestAttr(wrapper, 'search-input');
      input.simulate('keyUp', { keyCode });
      const fetchWeatherCallCount = fetchWeatherMock.mock.calls.length;
      expect(fetchWeatherCallCount).toBe(1);
    });
  });
});
