//allows for the aync/ await
import 'babel-polyfill';
import axios from 'axios';
import { CITY_SEARCH, CITY_ERROR } from './types';

let ROOT_URL;
process.env.NODE_ENV === 'production' ? (ROOT_URL = 'https://salty-temple-54689.herokuapp.com') : (ROOT_URL = 'http://localhost:3000');

export const fetchWeather = (cityName, units) => async dispatch => {
  try {
    const res = await axios.post(`${ROOT_URL}/city`, { cityName, units });
    dispatch({ type: CITY_SEARCH, payload: res.data });
    dispatch({ type: CITY_ERROR, payload: null });
  } catch (e) {
    const error = {
      errorMessage: "We can't find data for your entry, please try again."
    };
    dispatch({
      type: CITY_ERROR,
      payload: error
    });
  }
};

export const fetchLatLon = (lat, lon) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/city`, { lat, lon });
  dispatch({ type: CITY_SEARCH, payload: res.data });
};
