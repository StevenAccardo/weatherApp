import React, { Component } from 'react';
import DailyForecast from './dailyForecast';
import WeeklyForecast from './weeklyForecast';
import SearchBar from './searchBar';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landing">
        <div className="landing__container">
          <SearchBar />
          <DailyForecast />
          <WeeklyForecast />
        </div>
      </div>
    );
  }
}

export default Landing;
