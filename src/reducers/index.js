import { combineReducers } from 'redux';
import weather from './weatherReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  weather,
  error
});

export default rootReducer;
