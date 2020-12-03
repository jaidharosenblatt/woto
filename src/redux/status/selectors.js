/**
 * @function
 * Get whether or not app is locally loading
 * @param {Object} store - Redux store
 * @returns {Boolean} loading
 */
const getLoading = (store) => {
  return store.status.loading;
};

/**
 * @function
 * Get whether or not app is globally loading
 * @param {Object} store - Redux store
 * @returns {Boolean} loading
 */
const getPageLoading = (store) => {
  return store.status.pageLoading;
};

/**
 * @function
 * Get whether there is an error in the app
 * @param {Object} store - Redux store
 * @returns {String} error state of all courses
 */
const getError = (store) => {
  return store.status.error;
};

/**
 * @function
 * Get whether there is a success message in the app
 * @param {Object} store - Redux store
 * @returns {String} success message
 */
const getSuccessMessage = (store) => {
  return store.status.success;
};

export default { getLoading, getPageLoading, getError, getSuccessMessage };
