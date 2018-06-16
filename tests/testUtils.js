import checkPropTypes from 'check-prop-types';
import { createStrore, applyMiddleware } from 'redux';
import rootReducer from '../src/reducers';

//creates a store for us with the initialState that is passed in
export const storeFactory = initialState => {
  const middleware = applyMiddleware(thunk);
  return createStore(rootReducer, initialState, middleware);
};

//finds the target element when we pass it a component wrapper and the data-test name of the element
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

//uses the check-prop-types library to check our prop-types
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name);
  expect(propError).toBeUndefined();
};
