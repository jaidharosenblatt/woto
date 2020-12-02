/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} course
 */
const getCourse = (store) => {
  const courseID = store.currentCourse;
  return store.courses[courseID];
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {String} courseID
 */
const getCourseID = (store) => {
  return store.currentCourse;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Array} courses
 */
const getSortedCorses = (store) => {
  return store.courses.sortedCourses;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Session or undefined if there is none
 */
const getSession = (store) => {
  const course = getCourse(store);
  if (!course?.activeSession) {
    return undefined;
  }
  return course?.session;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Boolean} Whether or not to go directly to Woto rooms
 */
const getBypassSession = (store) => {
  return getCourse(store)?.bypassSession;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Question
 */
const getActiveQuestion = (store) => {
  return getCourse(store)?.activeQuestion;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Array} Discussions
 */
const getDiscussions = (store) => {
  const course = getCourse(store);
  return course?.discussions ? course?.discussions : [];
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Discussion
 */
const getActiveDiscussion = (store) => {
  return getCourse(store)?.activeDiscussion;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} Stats
 */
const getStats = (store) => {
  return getCourse(store)?.stats;
};

/**
 * @function
 * Get description from either question or discussion
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} Description
 */
const getDescription = (store) => {
  const course = getCourse(store);
  let description;
  if (course?.activeDiscussion) {
    description = course?.activeDiscussion?.description;
  }
  if (course?.activeQuestion) {
    description = course?.session?.activeQuestion?.description;
  }
  return description;
};

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
 * @returns {Object} error state of all courses
 */
const getError = (store) => {
  return store.status.error;
};

// /**
//  * @function
//  * @param {Object} store - Redux store
//  * @returns {Boolean} loading state of all courses
//  */
// const getLoading = (store) => {
//   return store?.courses?.loading;
// };

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
 * Get whether user is authenticated
 * @param {Object} store - Redux store
 * @returns {Boolean} user
 */
const getAuthenticationStatus = (store) => {
  return store.auth.isAuthenticated;
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

export default {
  getLoading,
  getPageLoading,
  getError,
  getCourse,
  getCourseID,
  getSortedCorses,
  getBypassSession,
  getSession,
  getActiveQuestion,
  getActiveDiscussion,
  getStats,
  getDiscussions,
  getDescription,
  getUser,
  getUserID,
  getAuthenticationStatus,
  getUserType,
};
