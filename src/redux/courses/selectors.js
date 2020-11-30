/**
 * @function
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} course
 */
const getCourse = (store, courseID) => {
  return store.courses[courseID];
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Boolean} loading state of all courses
 */
const getLoading = (store) => {
  return store?.courses?.loading;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} error state of all courses
 */
const getError = (store) => {
  return store?.courses?.error;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} Session
 */
const getSession = (store, courseID) => {
  return getCourse(store, courseID)?.session;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Boolean} Whether or not to go directly to Woto rooms
 */
const getBypassSession = (store, courseID) => {
  return getCourse(store, courseID)?.bypassSession;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} Question
 */
const getActiveQuestion = (store, courseID) => {
  return getSession(store, courseID)?.activeQuestion;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Array} Discussions
 */
const getDiscussions = (store, courseID) => {
  const course = getCourse(store, courseID);
  return course?.discussions ? course?.discussions : [];
};

/**
 * @function
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} Discussion
 */
const getActiveDiscussion = (store, courseID) => {
  return getDiscussions(store, courseID)?.activeDiscussion;
};

/**
 * @function
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} Stats
 */
const getStats = (store, courseID) => {
  return getSession(store, courseID)?.stats;
};

/**
 * @function
 * Get description from either question or discussion
 * @param {Object} store - Redux store
 * @param {String} courseID
 * @returns {Object} Description
 */
const getDescription = (store, courseID) => {
  const course = getCourse(store, courseID);
  let description = {};
  if (course?.activeDiscussion) {
    description = course?.activeDiscussion?.description;
  }
  if (course?.session?.activeQuestion) {
    description = course?.session?.activeQuestion.description;
  }
  return description;
};

export default {
  getLoading,
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
