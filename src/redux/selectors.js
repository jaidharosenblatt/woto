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
 * @returns {Object} Session
 */
const getSession = (store) => {
  return getCourse(store)?.session;
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
  return getSession(store)?.activeQuestion;
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
  return getSession(store)?.stats;
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
  let description = {};
  if (course?.activeDiscussion) {
    description = course?.activeDiscussion?.description;
  }
  if (course?.session?.activeQuestion) {
    description = course?.session?.activeQuestion.description;
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

export default {
  getLoading,
  getPageLoading,
  getError,
  getCourse,
  getBypassSession,
  getSession,
  getActiveQuestion,
  getActiveDiscussion,
  getStats,
  getDiscussions,
  getDescription,
};
