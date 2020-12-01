import actionTypes from "./actionsTypes";

/**
 * Create a dispatch to bypass the session in redux
 * @param {String} courseID
 * @param {Boolean} bypassSession whether or not to go directly to Woto Rooms
 * @returns {Object} function to dispatch
 */
function setBypassSession(courseID, bypassSession) {
  return {
    type: actionTypes.SET_BYPASS_SESSION,
    courseID,
    payload: bypassSession,
  };
}

/**
 * Create a dispatch to set course details in redux
 * @param {String} courseID
 * @param {Object} course
 * @returns {Object} function to dispatch
 */
function setCourse(courseID, course) {
  return {
    type: actionTypes.SET_COURSE,
    courseID,
    payload: course,
  };
}

/**
 * Create a dispatch to set a session for a given course in redux
 * @param {String} courseID
 * @param {Object} session
 * @returns {Object} function to dispatch
 */
function setSession(courseID, session) {
  return {
    type: actionTypes.SET_SESSION,
    courseID,
    payload: session,
  };
}

/**
 * Create a dispatch to set discussions for a given course in redux
 * @param {String} courseID
 * @param {Array} discussions
 * @returns {Object} function to dispatch
 */
function setDiscussions(courseID, discussions) {
  return {
    type: actionTypes.SET_DISCUSSIONS,
    courseID,
    payload: discussions,
  };
}

/**
 * Create a dispatch to set a discussions for a given course in redux
 * @param {String} courseID
 * @param {Object} discussion
 * @returns {Object} function to dispatch
 */
function setActiveDiscussion(courseID, discussion) {
  return {
    type: actionTypes.SET_ACTIVE_DISCUSSION,
    courseID,
    payload: discussion,
  };
}

/**
 * Create a dispatch to set questions for a given course in redux
 * @param {String} courseID
 * @param {Array} questions
 * @returns {Object} function to dispatch
 */
function setQuestions(courseID, questions) {
  return {
    type: actionTypes.SET_QUESTIONS,
    courseID,
    payload: questions,
  };
}

/**
 * Create a dispatch to set an active question for a given course in redux
 * @param {String} courseID
 * @param {Object} question
 * @returns {Object} function to dispatch
 */
function setActiveQuestion(courseID, question) {
  return {
    type: actionTypes.SET_ACTIVE_QUESTION,
    courseID,
    payload: question,
  };
}

/**
 * Create a dispatch to setup statistics for a given course in redux
 * @param {String} courseID
 * @param {Object} stats
 * @returns {Object} function to dispatch
 */
function setStats(courseID, stats) {
  return {
    type: actionTypes.SET_STATS,
    courseID,
    payload: stats,
  };
}

export default {
  setBypassSession,
  setCourse,
  setSession,
  setDiscussions,
  setActiveDiscussion,
  setQuestions,
  setActiveQuestion,
  setStats,
};
