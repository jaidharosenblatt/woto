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
 * Get whether there is an error in the app
 * @param {Object} store - Redux store
 * @returns {String} serverError state of all courses
 */
const getServerError = (store) => {
  return store.status.serverError;
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

/**
 * @function
 * Get whether there is as server success message in the app
 * @param {Object} store - Redux store
 * @returns {String} success message
 */
const getServerSuccess = (store) => {
  return store.status.serverSuccess;
};

/**
 * @function
 * Get whether there is a message (success or error)
 * @param {Object} store - Redux store
 * @returns {String} message
 */
const getMessage = (store) => {
  if (getError(store)) {
    return getError(store);
  }
  if (getSuccessMessage(store)) {
    return getSuccessMessage(store);
  }
};

/**
 * @function
 * Get whether there is a message (success or error)
 * @param {Object} store - Redux store
 * @returns {String} message type of Ant form
 */
const getMessageStatus = (store) => {
  if (getError(store)) {
    return "error";
  }
  if (getSuccessMessage(store)) {
    return "success";
  }
  return "validating";
};

/**
 * @function
 * Get key of modal to render globally
 * @param {Object} store - Redux store
 * @returns {String} the string of modal or null
 */
const getModalKey = (store) => {
  return store.status?.modalKey;
};

/**
 * @function
 * Check if the modal should be blocked
 * @param {Object} store - Redux store
 * @returns {Boolean} whether or not to block modal refreshes
 */
const getBlockModal = (store) => {
  return store.status?.blockModal;
};

export default {
  getLoading,
  getPageLoading,
  getError,
  getServerError,
  getSuccessMessage,
  getServerSuccess,
  getModalKey,
  getBlockModal,
  getMessage,
  getMessageStatus,
};
