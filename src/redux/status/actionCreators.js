import actionTypes from "./actionTypes";

/**
 * Create a dispatch to start local loading in redux
 * @returns {Object} function to dispatch
 */
export function startLoading() {
  return {
    type: actionTypes.START_LOADING,
  };
}

/**
 * Create a dispatch to stop local loading in redux
 * @returns {Object} function to dispatch
 */
export function stopLoading() {
  return {
    type: actionTypes.STOP_LOADING,
  };
}

/**
 * Create a dispatch to start page loading in redux
 * @returns {Object} function to dispatch
 */
export function startPageLoading() {
  return {
    type: actionTypes.START_PAGE_LOADING,
  };
}

/**
 * Create a dispatch to stop page loading in redux
 * @returns {Object} function to dispatch
 */
export function stopPageLoading() {
  return {
    type: actionTypes.STOP_PAGE_LOADING,
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
export function setServerError(error) {
  const errorMessage = "There was an issue with " + error;
  return {
    type: actionTypes.SET_SERVER_ERROR,
    payload: errorMessage,
  };
}

/**
 * Create error message
 * @param {String} errorMessage type of error
 * @returns {Object} to dispatch to redux ex: "There was an issue with "
 */
export function setError(errorMessage) {
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

/**
 * Clear the success message
 * @param {String} message
 * @returns {Object} to dispatch to redux
 */
export function clearSuccessMessage() {
  return {
    type: actionTypes.SET_SUCCESS,
    payload: undefined,
  };
}

/**
 * Clear the modal status in redux
 * @param {String} the key of the modal from modalTypes.js
 * @returns {Object} to dispatch to redux
 */
export function setModalKey(key) {
  return {
    payload: key,
    type: actionTypes.SET_MODAL_KEY,
  };
}

/**
 * Clear the modal status in redux
 * @returns {Object} to dispatch to redux
 */
export function clearModalKey() {
  return {
    type: actionTypes.CLEAR_MODAL_KEY,
  };
}

/**
 * Prevent modal from causing additional modal popups
 * TODO remove once sockets are implemented
 * @returns {Object} to dispatch to redux
 */
export function blockModal() {
  return {
    type: actionTypes.BLOCK_MODAL,
  };
}

/**
 * Reset the status state in redux
 * @returns {Object} to dispatch to redux
 */
export function resetStatus() {
  return {
    type: actionTypes.RESET,
  };
}
