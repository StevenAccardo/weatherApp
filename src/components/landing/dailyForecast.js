import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DailyForecast = ({ weather }) => {
  const optionsDateTime = {
    month: 'short',
    weekday: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  const optionsTime = {
    hour: 'numeric',
    minute: 'numeric'
  };

  const convertTime = (unixTime, options) => {
    const localTime = new Date(unixTime * 1000).toLocaleString('en-US', options).replace(/,/g, '');

    return localTime;
  };

  const tempUnits = units => {
    return units === 'imperial' ? 'F' : 'C';
  };

  const windUnits = units => {
    return units === 'imperial' ? 'mph' : 'mps';
  };

  if (weather) {
    const name = weather.current.name;
    const temp = parseInt(weather.current.main.temp);
    const maxTemp = parseInt(weather.current.main.temp_max);
    const minTemp = parseInt(weather.current.main.temp_min);
    const pressure = weather.current.main.pressure;
    const humidity = weather.current.main.humidity;
    const sunrise = convertTime(weather.current.sys.sunrise, optionsTime);
    const sunset = convertTime(weather.current.sys.sunset, optionsTime);
    const windSpeed = parseInt(weather.current.wind.speed);
    const condition = weather.current.weather[0].description;
    const updatedOn = convertTime(weather.current.dt, optionsDateTime);
    const units = weather.units;

    return (
      <div className="dailyForecast">
        <div className="dailyForecast__details">
          <h3 className="dailyForecast__header">{name}'s Weather</h3>
          <p className="dailyForecast__updatedOn">{updatedOn}</p>
          <p className="dailyForecast__temp">
            {temp}
            <sup className="dailyForecast__sup dailyForecast__sup--mainTemp">&deg;{tempUnits(units)}</sup>
          </p>
          <p className="dailyForecast__condition">{condition}</p>
        </div>
        <div className="dailyForecast__subDetails">
          <div className="dailyForecast__wind">
            <p className="subDetails__title">Wind</p>
            <p className="subdetails__values">
              {windSpeed}
              <sup className="dailyForecast__sup">{windUnits(units)}</sup>
            </p>
          </div>
          <div className="dailyForecast__maxTemp">
            <p className="subDetails__title">Max. Temp</p>
            <p className="subdetails__values">
              {maxTemp}
              <sup className="dailyForecast__sup">&deg;{tempUnits(units)}</sup>
            </p>
          </div>
          <div className="dailyForecast__minTemp">
            <p className="subDetails__title">Min. Temp</p>
            <p className="subdetails__values">
              {minTemp}
              <sup className="dailyForecast__sup">&deg;{tempUnits(units)}</sup>
            </p>
          </div>
          <div className="dailyForecast__pressure">
            <p className="subDetails__title">Pressure</p>
            <p className="subdetails__values">
              {pressure}
              <sup className="dailyForecast__sup">hPa</sup>
            </p>
          </div>
          <div className="dailyForecast__humidity">
            <p className="subDetails__title">Humidity</p>
            <p className="subdetails__values">
              {humidity}
              <sup className="dailyForecast__sup">%</sup>
            </p>
          </div>
          <div className="dailyForecast__sunrise">
            <p className="subDetails__title">Sunrise</p>
            <p className="subdetails__values">{sunrise}</p>
          </div>
          <div className="dailyForecast__sunset">
            <p className="subDetails__title">Sunset</p>
            <p className="subdetails__values">{sunset}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

DailyForecast.propTypes = {
  weather: PropTypes.object
};

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps)(DailyForecast);
