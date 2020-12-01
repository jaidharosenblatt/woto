import actionTypes from "./actionTypes";

/**
 * Create a dispatch to set current course in redux
 * @returns {Object} function to dispatch
 */
export function setCurrentCourse(courseID) {
  return {
    type: actionTypes.SET_ACTIVE_COURSE,
    payload: courseID,
  };
}
