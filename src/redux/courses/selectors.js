/**
 * @function
 * @param {Object} store - Redux store
 * @returns {Object} course
 */
const getCourse = (store) => {
  const courseID = store.currentCourse;
  console.log(courseID);
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
  return getDiscussions(store)?.activeDiscussion;
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
