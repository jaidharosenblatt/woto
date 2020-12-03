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
 * @returns {Object} function to dispatch
 */
export function clearError() {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
}

/**
 * Create error message
 * @param {String} error type of error
 * @returns {Object} to dispatch to redux ex: "There was an issue with "
 */
export function setError(error) {
  const errorMessage = "There was an issue with " + error;
  return {
    type: actionTypes.SET_ERROR,
    payload: errorMessage,
  };
}

/**
 * Create error message
 * @param {String} errorMessage type of error
 * @returns {Object} to dispatch to redux ex: "There was an issue with "
 */
export function setCustomError(errorMessage) {
  return {
    type: actionTypes.SET_ERROR,
    payload: errorMessage,
  };
}

/**
 * Create a success message
 * @param {String} message
 * @returns {Object} to dispatch to redux
 */
export function setSuccessMessage(message) {
  return {
    type: actionTypes.SET_SUCCESS,
    payload: message,
  };
}
