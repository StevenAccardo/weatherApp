const axios = require('axios');
const weatherAPIKey = require('../config/keys').WEATHERAPIKEY;

//https://openweathermap.org/api
exports.weather = (req, res, next) => {
  console.log('req.body', req.body);
  const cityName = req.body.cityName;
  const units = req.body.units || 'imperial';
  console.log('units', units);

  axios
    .all([
      //get current weather
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=${weatherAPIKey}`),
      axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&APPID=${weatherAPIKey}`) //get 5 day forecast
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
