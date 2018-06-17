import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MagnifySVG from './magnifySVG';
import { fetchWeather } from '../../actions';

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      units: 'imperial'
    };
    this.keyUp = this.keyUp.bind(this);
    this.unitChange = this.unitChange.bind(this);
  }

  keyUp(e) {
    if (e.keyCode === 13 && this.state.searchValue !== '') {
      //api expects white space to be replaced with "+" when city names have spaces, i.e. San Diego => San+Diego
      const cityName = this.state.searchValue.replace(/\ /g, '+');
      this.props.fetchWeather(cityName, this.state.units);
      this.setState({ searchValue: '', units: 'imperial' });
    }
  }

  unitChange(e) {
    if (e.target.value) {
      this.setState({
        units: e.target.value
      });
    }
  }

  render() {
    return (
      <div data-test="component-searchbar" className="searchBar">
        <input
          data-test="search-input"
          type="text"
          onKeyUp={this.keyUp}
          value={this.state.searchValue}
          onChange={e => this.setState({ searchValue: e.target.value })}
          className="searchBar__input"
          placeholder="City Name"
        />
        <MagnifySVG />
        <fieldset className="searchBar__fieldSet">
          <div className="searchBar__radioGroup">
            <input
              data-test="imperial-radio-input"
              onChange={this.unitChange}
              id="imperial"
              className="searchBar__radio-input"
              type="radio"
              name="units"
              value="imperial"
              checked={this.state.units === 'imperial'}
            />
            <label className="searchBar__radio-label" htmlFor="imperial">
              <span className="searchBar__radio-button" />Imperial
            </label>
          </div>
          <div className="searchBar__radioGroup">
            <input
              data-test="metric-radio-input"
              onChange={this.unitChange}
              id="metric"
              className="searchBar__radio-input"
              type="radio"
              name="units"
              value="metric"
              checked={this.state.units === 'metric'}
            />
            <label className="searchBar__radio-label" htmlFor="metric">
              <span className="searchBar__radio-button" />Metric
            </label>
          </div>
        </fieldset>
      </div>
    );
  }
}

SearchBar.propTypes = {
  fetchWeather: PropTypes.func
};

export default connect(
  null,
  { fetchWeather }
)(SearchBar);
