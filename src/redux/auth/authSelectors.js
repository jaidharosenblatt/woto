/**
 * @function
 * Get current user
 * @param {Object} store - Redux store
 * @returns {Object} user
 */
const getUser = (store) => {
  return store.auth.user;
};

/**
 * @function
 * Get current user's ID
 * @param {Object} store - Redux store
 * @returns {String} userID
 */
const getUserID = (store) => {
  return store.auth.user?._id;
};

/**
 * @function
 * Get current user's name
 * @param {Object} store - Redux store
 * @returns {String} User's name
 */
const getUserName = (store) => {
  return store.auth.user?.name;
};

/**
 * @function
 * Get current user's meeting URL
 * @param {Object} store - Redux store
 * @returns {String} User's meeting URL
 */
const getUserMeetingURL = (store) => {
  return store.auth.user?.meetingURL;
};

/**
 * @function
 * Get whether user is authenticated
 * @param {Object} store - Redux store
 * @returns {Boolean} user is authenticated
 */
const getAuthenticationStatus = (store) => {
  return store.auth.isAuthenticated;
};

/**
 * @function
 * Get whether user is verified
 * @param {Object} store - Redux store
 * @returns {Boolean} user is verified
 */
const getVerificationStatus = (store) => {
  return store.auth.user?.verified;
};

/**
 * @function
 * Get whether user is student or instructor
 * @param {Object} store - Redux store
 * @returns {String} student or instructor
 */
const getUserType = (store) => {
  return store.auth.userType;
};

/**
 * @function
 * Get whether of whether user is instructor
 * @param {Object} store - Redux store
 * @returns {Boolean} if user is an instructor
 */
const userIsInstructor = (store) => {
  return store.auth.userType === "instructor";
};

export default {
  getUser,
  getUserID,
  getUserName,
  getUserMeetingURL,
  getAuthenticationStatus,
  getUserType,
  userIsInstructor,
  getVerificationStatus,
};
