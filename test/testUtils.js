import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../src/redux/index";
import { middlewares } from "../src/redux/configureStore";

/**
 * Create a testing store with imported reducers, middleware, and inital state
 * globals: rootReducer
 * @param {Object} initialState
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );

  return createStoreWithMiddleware(rootReducer, initialState);
};

/**
 * Returns nodes with the given data-test attribute
 * @param {ShallowWrapper} wrapper Enzyme Shallow Wrapper
 * @param {string} val - Value of data-test attribure for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const checkProps = (component, confirmingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    confirmingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
