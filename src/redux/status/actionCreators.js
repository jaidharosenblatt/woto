import actionTypes from "./actionTypes";

/**
 * Create a dispatch to start local loading in redux
 * @returns {Object} function to dispatch
 */
export function startLoading() {
  return {
    type: actionTypes.SET_LOADING,
    payload: true,
  };
}

/**
 * Create a dispatch to stop local loading in redux
 * @returns {Object} function to dispatch
 */
export function stopLoading() {
  return {
    type: actionTypes.SET_LOADING,
    payload: false,
  };
}

/**
 * Create a dispatch to start page loading in redux
 * @returns {Object} function to dispatch
 */
export function startPageLoading() {
  return {
    type: actionTypes.SET_PAGE_LOADING,
    payload: true,
  };
}

/**
 * Create a dispatch to stop page loading in redux
 * @returns {Object} function to dispatch
 */
export function stopPageLoading() {
  return {
    type: actionTypes.SET_PAGE_LOADING,
    payload: false,
  };
}

/**
 * Create an object for redux error dispatch
 * @param {String} error - message with error
 * @returns {Object} function to dispatch
 */
export function setError(error) {
  return {
    type: actionTypes.SET_ERROR,
    payload: error,
  };
}
