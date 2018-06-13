import 'babel-polyfill';
import React from 'react';
import { connect } from 'react-redux';

const WeeklyForecast = ({ weather }) => {
  if (weather && weather.forecast.list) {
    //grabs forecast array, 5days of data ever 3 hours
    const forecastArr = weather.forecast.list;
    //gets the current date with local timezone
    const now = new Date();

    //returns only forecasts that don't have todays date, no need to forecast today when we have it already in the daily forecast
    const selectedForecastArr = forecastArr.filter(forecast => {
      const forecastDate = new Date(forecast.dt * 1000);
      return now.getDay() !== forecastDate.getDay();
    });

    //separates each 3 hour forecast into its day
    const dayDivider = (arr, dayIncrement) => {
      return arr.filter(item => {
        return now.getDay() + dayIncrement === new Date(item.dt * 1000).getDay();
      });
    };

    //Calls function to seperate array into each day, ony grab 4 days because we can't be guarenteed to have all of the data for the 5th day, because it depends at what time of the day the request is made. API doens't send back 5 complete days, it sends 5 days worth of data from the request time. Think 120 hours instead of 5 whole days.
    const day1 = dayDivider(selectedForecastArr, 1);
    const day2 = dayDivider(selectedForecastArr, 2);
    const day3 = dayDivider(selectedForecastArr, 3);
    const day4 = dayDivider(selectedForecastArr, 4);

    //takes the lenth of the daily array, divides it by two, and then rounds to the nearest index. This allows me to use data from the middle of the day for a decent indicator of the daily forecast
    const singleOut = dayArr => {
      const arrIndex = Math.round(dayArr.length / 2);

      return dayArr[arrIndex];
    };

    const day1Final = singleOut(day1);
    const day2Final = singleOut(day2);
    const day3Final = singleOut(day3);
    const day4Final = singleOut(day4);

    const makeObject = dailyArr => {
      const ob = {};

      ob.day = new Date(dailyArr.dt * 1000).toLocaleString('en-US', { weekday: 'short' });
      ob.date = new Date(dailyArr.dt * 1000).toLocaleString('en-US', { month: '2-digit', day: '2-digit' });
      ob.description = dailyArr.weather[0].description;
      ob.temp = dailyArr.main.temp;
      ob.humidity = dailyArr.main.humidity;
      ob.pressure = dailyArr.main.pressure;
      ob.wind = dailyArr.wind.speed;

      return ob;
    };

    const day1Object = makeObject(day1Final);
    const day2Object = makeObject(day2Final);
    const day3Object = makeObject(day3Final);
    const day4Object = makeObject(day4Final);

    const totalData = [day1Object, day2Object, day3Object, day4Object];

    const renderGrid = totalData => {
      const organize = property => {
        const propertyArray = totalData.map(dataSet => {
          return dataSet[property];
        });
        return propertyArray.map((item, index) => {
          const toInt = item => {
            switch (property) {
              case 'temp':
                return parseInt(item);
              case 'pressure':
                return parseInt(item);
              case 'wind':
                return parseInt(item);
              default:
                return item;
            }
          };

          return (
            <div key={`${property}-${index}`} className={`weekly__${property} weekly__gridCell`}>
              {toInt(item)}
            </div>
          );
        });
      };
      const divArray = [];

      for (let prop in totalData[0]) {
        divArray.push(organize(prop));
      }

      divArray.map((arr, index) => {
        const unitRender = labelName => {
          switch (labelName) {
            case 'temp':
              return weather.units === 'imperial' ? ' (F)' : ' (C)';
            case 'humidity':
              return ' (%)';
            case 'pressure':
              return ' (hPa)';
            case 'wind':
              return weather.units === 'imperial' ? ' (mph)' : ' (mps)';
            default:
              return;
          }
        };

        return arr.unshift(
          <div key={`label-${index}`} className={`${arr[0].props.className} weekly__label`}>
            {arr[0].key.replace('-0', '')}
            {unitRender(arr[0].key.replace('-0', ''))}
          </div>
        );
      });

      const finalRenderedArray = [].concat(...divArray);
      return finalRenderedArray.map(div => {
        return div;
      });
    };

    return (
      <div className="weekly">
        <div className="weekly__header">Next 4 Days</div>
        <div className="weekly__container">{renderGrid(totalData)}</div>
      </div>
    );
  }

  return (
    <div className="weekly">
      <div className="weekly__header">Next 4 Days</div>
      <div className="weekly__container">
        <div class="weekly__day weekly__gridCell weekly__label">day</div>
        <div class="weekly__day weekly__gridCell">Wed</div>
        <div class="weekly__day weekly__gridCell">Thu</div>
        <div class="weekly__day weekly__gridCell">Fri</div>
        <div class="weekly__day weekly__gridCell">Sat</div>
        <div class="weekly__date weekly__gridCell weekly__label">date</div>
        <div class="weekly__date weekly__gridCell">06/13</div>
        <div class="weekly__date weekly__gridCell">06/14</div>
        <div class="weekly__date weekly__gridCell">06/15</div>
        <div class="weekly__date weekly__gridCell">06/16</div>
        <div class="weekly__description weekly__gridCell weekly__label">description</div>
        <div class="weekly__description weekly__gridCell">clear sky</div>
        <div class="weekly__description weekly__gridCell">few clouds</div>
        <div class="weekly__description weekly__gridCell">clear sky</div>
        <div class="weekly__description weekly__gridCell">light rain</div>
        <div class="weekly__temp weekly__gridCell weekly__label">temp</div>
        <div class="weekly__temp weekly__gridCell">82.48</div>
        <div class="weekly__temp weekly__gridCell">79.43</div>
        <div class="weekly__temp weekly__gridCell">74.75</div>
        <div class="weekly__temp weekly__gridCell">70.36</div>
        <div class="weekly__humidity weekly__gridCell weekly__label">humidity</div>
        <div class="weekly__humidity weekly__gridCell">61</div>
        <div class="weekly__humidity weekly__gridCell">64</div>
        <div class="weekly__humidity weekly__gridCell">67</div>
        <div class="weekly__humidity weekly__gridCell">73</div>
        <div class="weekly__pressure weekly__gridCell weekly__label">pressure</div>
        <div class="weekly__pressure weekly__gridCell">993.04</div>
        <div class="weekly__pressure weekly__gridCell">992.07</div>
        <div class="weekly__pressure weekly__gridCell">992.93</div>
        <div class="weekly__pressure weekly__gridCell">992.88</div>
        <div class="weekly__wind weekly__gridCell weekly__label">wind</div>
        <div class="weekly__wind weekly__gridCell">4.18</div>
        <div class="weekly__wind weekly__gridCell">4.14</div>
        <div class="weekly__wind weekly__gridCell">6.62</div>
        <div class="weekly__wind weekly__gridCell">6.22</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps)(WeeklyForecast);
