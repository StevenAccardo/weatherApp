import { CITY_SEARCH } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case CITY_SEARCH:
      return action.payload;
    default:
      return state;
  }
};
