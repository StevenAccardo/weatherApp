const axios = require('axios');
const weatherAPIKey = require('../config/keys').WEATHERAPIKEY;

//https://openweathermap.org/api
exports.weather = (req, res, next) => {
  console.log('req.body', req.body);
  const cityName = req.body.cityName;
  const lat = req.body.lat;
  const lon = req.body.lon;
  const units = req.body.units || 'imperial';
  console.log('units', units);

  let currentWeatherURL;
  let forecastWeatherURL;
  //Used if the user enters a manual search
  if (cityName) {
    currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=${weatherAPIKey}`;
    forecastWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&APPID=${weatherAPIKey}`;
    //Used if the app gets the geolocation
  } else {
    currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&APPID=${weatherAPIKey}`;
    forecastWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&APPID=${weatherAPIKey}`;
  }

  axios
    .all([
      //get current weather
      axios.get(currentWeatherURL),
      axios.get(forecastWeatherURL) //get 5 day forecast
    ])
    .then(
      axios.spread((currentRes, forecastRes) => {
        const weather = {
          current: currentRes.data,
          forecast: forecastRes.data,
          units
        };
        console.log('units', weather.units);
        res.send(weather);
      })
    )
    .catch(error => {
      console.log('error', error);
    });
};
