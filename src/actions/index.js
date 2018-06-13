//allows for the aync/ await
import 'babel-polyfill';
import axios from 'axios';
import { CITY_SEARCH } from './types';

let ROOT_URL;
process.env.NODE_ENV === 'production' ? (ROOT_URL = '') : (ROOT_URL = 'http://localhost:3000');

export const fetchWeather = (cityName, units) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/city`, { cityName, units });
  dispatch({ type: CITY_SEARCH, payload: res.data });
};

export const fetchLatLon = (lat, lon) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/city`, { lat, lon });
  dispatch({ type: CITY_SEARCH, payload: res.data });
};
