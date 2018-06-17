import { CITY_ERROR } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case CITY_ERROR:
      return action.payload;
    default:
      return state;
  }
};
