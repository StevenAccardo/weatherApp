import 'babel-polyfill';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const WeeklyForecast = ({ weather, error }) => {
  if (error) {
    return null;
  } else if (weather && weather.forecast.list) {
    //grabs forecast array, 5days of data ever 3 hours
    const forecastArr = weather.forecast.list;
    //gets the current date with local timezone
    const now = new Date();

    //returns only forecasts that don't have todays date, no need to forecast today when we have it already in the daily forecast
    const selectedForecastArr = forecastArr.filter(forecast => {
      const forecastDate = new Date(forecast.dt * 1000);
      return now.getDay() !== forecastDate.getDay();
    });

    //separates each 3 hour forecast into its corresponding day of the week
    const dayDivider = (arr, dayIncrement) => {
      return arr.filter(item => {
        //Weekdays in the Date Object go from 0 - 6, so I can't just increment from todays day, otherwise in many cases we will have a number past 6, so i had to come up with this solution.
        const dateTarget = now.getDay() + dayIncrement;
        if (dateTarget <= 6) {
          return now.getDay() + dayIncrement === new Date(item.dt * 1000).getDay();
        } else if (dateTarget === 7) {
          return 0 === new Date(item.dt * 1000).getDay();
        } else {
          return dateTarget - 7 === new Date(item.dt * 1000).getDay();
        }
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

    //calls the function to get a single forecast for each day from the forecast array
    const day1Final = singleOut(day1);
    const day2Final = singleOut(day2);
    const day3Final = singleOut(day3);
    const day4Final = singleOut(day4);

    //Creates an object of the data we need, out of each array
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

    //makes a 4 day array with a a daily object at each index
    const totalData = [day1Object, day2Object, day3Object, day4Object];

    //When invoked, returns all of the divs that create the grid
    const renderGrid = totalData => {
      const organize = property => {
        //loops through the totalData array, and pulls off the value of each property passed in, for each object, and then passes that value into another array, so we will return an array with 4 values, all from the same property name, but each for a different day of the week
        const propertyArray = totalData.map(dataSet => {
          return dataSet[property];
        });
        //Loop through each 4-set array to create a div
        return propertyArray.map((item, index) => {
          //Turns floats into ints where necesarry
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

          //creates a div which is returned where they are all pushed onto an empty array, to make one large array holding subarray, each subarray having come from the same property for each day
          return (
            <div key={`${property}-${index}`} className={`weekly__${property} weekly__gridCell`}>
              {toInt(item)}
            </div>
          );
        });
      };
      const divArray = [];

      //loops through the first object in the array, and pulls the name of each property, then passes that name into the organize function
      //This loop was only used to reference the names, and since they are the same on all of the oibjects, we could have referenced any index.
      //We could have as easily made static calls to organize() and manually passed in the required property name
      //The divArray will be full of React JSX divs after the loop is finished
      for (let prop in totalData[0]) {
        divArray.push(organize(prop));
      }

      divArray.map((arr, index) => {
        //Adds units where necesarry
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

        //adds an index to the beginning of each sub array that will hold a new div with label information for each row
        return arr.unshift(
          <div key={`label-${index}`} className={`${arr[0].props.className} weekly__label`}>
            {arr[0].key.replace('-0', '')}
            {unitRender(arr[0].key.replace('-0', ''))}
          </div>
        );
      });
      //Flattens all subrays into one long array
      const finalRenderedArray = [].concat(...divArray);
      //loops through large array and renders divs in order, which is how I designed it
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
  } else {
    return null;
  }
};

WeeklyForecast.propTypes = {
  weather: PropTypes.object
};

const mapStateToProps = ({ weather, error }) => ({ weather, error });

export default connect(mapStateToProps)(WeeklyForecast);
