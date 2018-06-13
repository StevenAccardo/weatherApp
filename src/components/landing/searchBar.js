import React, { Component } from 'react';
import { connect } from 'react-redux';
import MagnifySVG from './magnifySVG';
import { fetchWeather } from '../../actions';

class SearchBar extends Component {
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
    if (e.keyCode === 13) {
      console.log('this.state', this.state);
      this.props.fetchWeather(this.state.searchValue, this.state.units);
      this.setState({ searchValue: '', units: 'imperial' });
    }
  }

  unitChange(e) {
    if (e.target.value !== this.state.unit) {
      this.setState({
        units: e.target.value
      });
    }
  }

  render() {
    return (
      <div className="searchBar">
        <input type="text" onKeyUp={this.keyUp} value={this.state.searchValue} onChange={e => this.setState({ searchValue: e.target.value })} className="searchBar__input" placeholder="City Name" />
        <MagnifySVG />
        <fieldset className="searchBar__fieldSet">
          <div className="searchBar__radioGroup">
            <input onChange={this.unitChange} id="imperial" className="searchBar__radio" type="radio" name="units" value="imperial" checked />
            <label htmlFor="imperial">Imperial</label>
          </div>
          <div className="searchBar__radioGroup">
            <input id="metric" className="searchBar__radio" type="radio" name="units" value="metric" />
            <label htmlFor="metric">Metric</label>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchWeather }
)(SearchBar);
