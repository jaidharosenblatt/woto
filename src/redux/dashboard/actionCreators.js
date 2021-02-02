import actionTypes from "./actionTypes";

/**
 * Create a dispatch to set an active TA for the dashboard
 * @param {String} assistantId
 * @returns {Object} function to dispatch
 */
export const setDashboardAssistant = (assistantId) => {
  return {
    type: actionTypes.SET_ASSISTANT,
    payload: assistantId,
  };
};

/**
 * Create a dispatch to set the start date for displaying date in dashboard
 * @param {String} date in unix
 * @returns {Object} function to dispatch
 */
export const setDashboardStartDate = (date) => {
  return {
    type: actionTypes.SET_START_DATE,
    payload: date,
  };
};

/**
 * Create a dispatch to set the end date for displaying date in dashboard
 * @param {String} date in unix
 * @returns {Object} function to dispatch
 */
export const setDashboardEndDate = (date) => {
  return {
    type: actionTypes.SET_END_DATE,
    payload: date,
  };
};

/**
 * Create a dispatch to set the at a glance stats from the flask api
 * @param {Object} stats in unix
 * @returns {Object} function to dispatch
 */
export const setDashboardHome = (stats) => {
  return {
    type: actionTypes.SET_HOME,
    payload: stats,
  };
};

/**
 * Create a dispatch to set the course for the dashboard
 * @param {String} courseId for course being displayed
 * @returns {Object} function to dispatch
 */
export const setDashboardCourse = (courseId) => {
  return {
    type: actionTypes.SET_COURSE,
    payload: courseId,
  };
};
