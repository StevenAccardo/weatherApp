import 'babel-polyfill';
import axios from 'axios';
import { CITY_SEARCH } from './types';

let ROOT_URL;

process.env.NODE_ENV === 'production' ? (ROOT_URL = '') : (ROOT_URL = 'http://localhost:3000');

export const fetchWeather = (cityName, units) => async dispatch => {
  console.log(cityName, units);
  const res = await axios.post(`${ROOT_URL}/city`, { cityName, units });
  console.log('res.data', res.data);

  dispatch({ type: CITY_SEARCH, payload: res.data });
};
